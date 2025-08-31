import { describe, it, expect } from 'vitest';
import { stripHtml } from '../src/stripHtml';

describe('stripHtml', () => {
  it('removes simple HTML tags', () => {
    expect(stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World');
  });

  it('removes div tags', () => {
    expect(stripHtml('<div>Test</div>')).toBe('Test');
  });

  it('removes nested tags', () => {
    expect(stripHtml('<div><p><b>Nested</b> content</p></div>')).toBe('Nested content');
  });

  it('handles self-closing tags', () => {
    expect(stripHtml('Hello<br/>World<hr/>')).toBe('HelloWorld');
  });

  it('handles attributes in tags', () => {
    expect(stripHtml('<p class="test" id="para">Content</p>')).toBe('Content');
  });

  it('handles inline styles', () => {
    expect(stripHtml('<span style="color: red;">Red text</span>')).toBe('Red text');
  });

  it('handles empty tags', () => {
    expect(stripHtml('<div></div><p></p>')).toBe('');
  });

  it('preserves text without tags', () => {
    expect(stripHtml('Plain text')).toBe('Plain text');
  });

  it('handles empty string', () => {
    expect(stripHtml('')).toBe('');
  });

  it('handles script tags', () => {
    expect(stripHtml('<script>alert("test")</script>Text')).toBe('alert("test")Text');
  });

  it('handles style tags', () => {
    expect(stripHtml('<style>body { color: red; }</style>Text')).toBe('body { color: red; }Text');
  });

  it('handles HTML entities', () => {
    expect(stripHtml('<p>&lt;Hello&gt;</p>')).toBe('&lt;Hello&gt;');
  });

  it('handles malformed tags', () => {
    expect(stripHtml('<p>Unclosed tag')).toBe('Unclosed tag');
  });

  it('handles multiple spaces between tags', () => {
    expect(stripHtml('<p>Hello</p>  <p>World</p>')).toBe('Hello  World');
  });
});