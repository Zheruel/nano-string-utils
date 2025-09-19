import * as nanoStringUtils from "nano-string-utils";
import { functionMetadata, type FunctionMeta } from "./metadata";

let currentFunction: string | null = null;

export function initPlayground() {
  const functionItems = document.querySelectorAll(".function-item");

  // Add click handlers to function items
  functionItems.forEach((item) => {
    item.addEventListener("click", () => {
      const functionName = item.getAttribute("data-function");
      if (functionName) {
        selectFunction(functionName);

        // Update active state
        document.querySelectorAll(".function-item").forEach((el) => {
          el.classList.remove("active");
        });
        item.classList.add("active");
      }
    });
  });

  // Handle URL hash for direct linking
  if (window.location.hash) {
    const functionName = window.location.hash.slice(1);
    if (functionMetadata[functionName]) {
      selectFunction(functionName);
      // Find and highlight the function in sidebar
      const item = document.querySelector(`[data-function="${functionName}"]`);
      if (item) {
        item.classList.add("active");
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
}

function selectFunction(functionName: string) {
  const meta = functionMetadata[functionName];
  if (!meta) return;

  currentFunction = functionName;
  window.location.hash = functionName;

  // Update UI
  const nameEl = document.getElementById("current-function-name");
  const descEl = document.getElementById("function-description");
  const sizeEl = document.getElementById("function-bundle-size");
  const copyBtn = document.getElementById("copy-import") as HTMLButtonElement;
  const editorEl = document.getElementById("playground-editor");

  if (nameEl) nameEl.textContent = functionName;
  if (descEl) descEl.textContent = meta.description;
  if (sizeEl) sizeEl.textContent = `~${meta.size}`;
  if (copyBtn) {
    copyBtn.style.display = "inline-block";
    copyBtn.onclick = () => copyImport(functionName);
  }
  if (editorEl) editorEl.style.display = "block";

  // Create input fields
  createInputFields(functionName, meta);

  // Load examples
  loadExamples(functionName, meta);

  // Execute with default values
  executeFunction();
}

function createInputFields(_functionName: string, meta: FunctionMeta) {
  const container = document.getElementById("input-fields");
  if (!container) return;

  container.innerHTML = "";

  meta.params.forEach((param) => {
    const group = document.createElement("div");
    group.className = "input-group";

    const label = document.createElement("label");
    label.textContent = `${param.name} (${param.type})`;
    if (param.optional) label.textContent += " - optional";

    const input =
      param.type === "string" && param.name.includes("text")
        ? document.createElement("textarea")
        : document.createElement("input");

    input.id = `param-${param.name}`;
    input.placeholder = param.default || "";
    input.value = param.default || "";

    if (param.type === "number") {
      (input as HTMLInputElement).type = "number";
    } else if (param.type === "boolean") {
      (input as HTMLInputElement).type = "checkbox";
      (input as HTMLInputElement).checked = param.default === "true";
    }

    input.addEventListener("input", () => executeFunction());
    input.addEventListener("change", () => executeFunction());

    group.appendChild(label);
    group.appendChild(input);
    container.appendChild(group);
  });
}

function executeFunction() {
  if (!currentFunction) return;

  const meta = functionMetadata[currentFunction];
  if (!meta) {
    updateOutput(`Function metadata not found for '${currentFunction}'`, true);
    return;
  }

  try {
    // Get parameter values
    const args: any[] = [];
    let validationError: string | null = null;

    for (const param of meta.params) {
      const input = document.getElementById(
        `param-${param.name}`
      ) as HTMLInputElement;
      if (!input) {
        validationError = `Input field not found for parameter '${param.name}'`;
        break;
      }

      let value: any = input.value;

      // Validate required parameters
      if (!param.optional && !value) {
        validationError = `Parameter '${param.name}' is required`;
        break;
      }

      // Handle empty optional parameters
      if (param.optional && !value) {
        args.push(undefined);
        continue;
      }

      // Type conversion and validation
      if (param.type === "number") {
        const num = parseFloat(value);
        if (value && isNaN(num)) {
          validationError = `Parameter '${param.name}' must be a valid number`;
          break;
        }
        value = num || 0;
      } else if (param.type === "boolean") {
        value = input.checked;
      } else if (param.type === "object") {
        try {
          if (value) {
            // Try to evaluate as JavaScript object notation first
            // This allows { maxSize: 100 } instead of requiring {"maxSize": 100}
            try {
              value = new Function("return " + value)();
              if (typeof value !== "object" || value === null) {
                throw new Error("Not an object");
              }
            } catch {
              // Fall back to strict JSON parsing
              value = JSON.parse(value);
            }
          } else {
            value = {};
          }
        } catch (e) {
          validationError = `Parameter '${param.name}' must be a valid object (e.g., { maxSize: 100 })`;
          break;
        }
      } else if (param.type === "function") {
        // Special handling for memoize function parameter
        try {
          value = new Function("return " + value)();
          if (typeof value !== "function") {
            validationError = `Parameter '${param.name}' must be a valid function`;
            break;
          }
        } catch (e) {
          validationError = `Parameter '${param.name}' must be a valid function expression`;
          break;
        }
      }

      args.push(value);
    }

    if (validationError) {
      updateOutput(validationError, true);
      return;
    }

    // Execute the function
    const fn = (nanoStringUtils as any)[currentFunction];
    if (!fn) {
      updateOutput(
        `Function '${currentFunction}' is not available in the library. This might be a configuration issue.`,
        true
      );

      // Suggest similar functions
      const allFunctions = Object.keys(nanoStringUtils);
      const similar = allFunctions.filter(
        (f) =>
          f.toLowerCase().includes(currentFunction?.toLowerCase() || "") ||
          (currentFunction?.toLowerCase() || "").includes(f.toLowerCase())
      );

      if (similar.length > 0) {
        updateOutput(`Did you mean: ${similar.join(", ")}?`, true);
      }
      return;
    }

    const result = fn(...args);

    // Update code preview
    updateCodePreview(currentFunction, args);

    // Update output
    updateOutput(result, false);
  } catch (error: any) {
    const errorMessage = error?.message || String(error);
    updateOutput(`Error: ${errorMessage}`, true);
  }
}

function updateCodePreview(functionName: string, args: any[]) {
  const codeEl = document.getElementById("code-preview");
  if (!codeEl) return;

  const argsStr = args
    .map((arg) => {
      if (typeof arg === "string") return `"${arg}"`;
      if (typeof arg === "function") {
        // Convert function to arrow function string
        const funcStr = arg.toString();
        if (funcStr.startsWith("function")) {
          // Convert function expression to arrow function
          return funcStr
            .replace(/function\s*\(/, "(")
            .replace(/\)\s*{/, ") => {");
        }
        return funcStr;
      }
      if (typeof arg === "object" && arg !== null) return JSON.stringify(arg);
      return String(arg);
    })
    .join(", ");

  const code = `import { ${functionName} } from 'nano-string-utils'

const result = ${functionName}(${argsStr})
console.log(result)`;

  codeEl.textContent = code;

  // Apply syntax highlighting
  if ((window as any).Prism) {
    (window as any).Prism.highlightElement(codeEl);
  }
}

function updateOutput(result: any, isError: boolean) {
  const outputEl = document.getElementById("output-result");
  if (!outputEl) return;

  outputEl.classList.toggle("error", isError);

  if (isError) {
    outputEl.textContent = result;
  } else if (typeof result === "function") {
    outputEl.textContent = `[Function: memoized]`;
  } else if (typeof result === "string") {
    outputEl.textContent = `"${result}"`;
  } else if (typeof result === "object" && result !== null) {
    outputEl.textContent = JSON.stringify(result, null, 2);
  } else {
    outputEl.textContent = String(result);
  }
}

function loadExamples(_functionName: string, meta: FunctionMeta) {
  const container = document.getElementById("examples-list");
  if (!container) return;

  container.innerHTML = "";

  meta.examples.forEach((example) => {
    const item = document.createElement("div");
    item.className = "example-item";

    const code = document.createElement("div");
    code.className = "example-code";
    code.textContent = example.code;

    const result = document.createElement("div");
    result.className = "example-result";
    result.textContent = `// ${example.result}`;

    item.appendChild(code);
    item.appendChild(result);

    // Click to load example
    item.addEventListener("click", () => {
      // Parse example and load into inputs
      const match = example.code.match(/\(([^)]*)\)/);
      if (match) {
        const argsStr = match[1];
        // Simple parser for example args
        const args = argsStr
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));

        meta.params.forEach((param, i) => {
          const input = document.getElementById(
            `param-${param.name}`
          ) as HTMLInputElement;
          if (input && args[i] !== undefined) {
            input.value = args[i];
          }
        });

        executeFunction();
      }
    });

    container.appendChild(item);
  });
}

function copyImport(functionName: string) {
  const text = `import { ${functionName} } from 'nano-string-utils'`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-import") as HTMLButtonElement;
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  });
}
