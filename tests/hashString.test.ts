import { describe, it, expect } from 'vitest';
import { hashString } from '../src/hashString';

describe('hashString', () => {
  it('generates consistent hash for same input', () => {
    const hash1 = hashString('test');
    const hash2 = hashString('test');
    expect(hash1).toBe(hash2);
  });

  it('generates different hashes for different inputs', () => {
    const hash1 = hashString('test1');
    const hash2 = hashString('test2');
    expect(hash1).not.toBe(hash2);
  });

  it('returns 0 for empty string', () => {
    expect(hashString('')).toBe(0);
  });

  it('returns positive number for non-empty strings', () => {
    expect(hashString('hello')).toBeGreaterThanOrEqual(0);
  });

  it('handles single character', () => {
    const hash = hashString('a');
    expect(typeof hash).toBe('number');
    expect(hash).toBeGreaterThan(0);
  });

  it('handles long strings', () => {
    const longString = 'a'.repeat(1000);
    const hash = hashString(longString);
    expect(typeof hash).toBe('number');
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it('handles special characters', () => {
    const hash = hashString('!@#$%^&*()');
    expect(typeof hash).toBe('number');
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it('handles unicode characters', () => {
    const hash = hashString('Hello 👋 世界');
    expect(typeof hash).toBe('number');
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it('case sensitive hashing', () => {
    const hash1 = hashString('Test');
    const hash2 = hashString('test');
    expect(hash1).not.toBe(hash2);
  });

  it('handles whitespace differently', () => {
    const hash1 = hashString('hello world');
    const hash2 = hashString('helloworld');
    expect(hash1).not.toBe(hash2);
  });

  it('generates reasonably distributed hashes', () => {
    const hashes = ['test1', 'test2', 'test3', 'test4', 'test5'].map(hashString);
    const uniqueHashes = new Set(hashes);
    expect(uniqueHashes.size).toBe(5);
  });
});