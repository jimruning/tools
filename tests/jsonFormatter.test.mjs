import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeJSON, sortObjectKeys } from '../js/utils/jsonFormatterUtils.js';

test('analyzeJSON counts nested objects and arrays', () => {
  const data = {
    profile: {
      name: 'Alice',
      preferences: [
        { theme: 'dark' },
        ['nested', { flag: true }]
      ]
    },
    active: true
  };

  const stats = analyzeJSON(data);
  assert.deepEqual(stats, { objects: 4, arrays: 2 });
});

test('analyzeJSON accumulates results when provided with an existing stats object', () => {
  const initialStats = { objects: 2, arrays: 1 };
  const result = analyzeJSON([{ value: 1 }, { value: 2 }], initialStats);
  assert.equal(result.objects, 4);
  assert.equal(result.arrays, 2);
});

test('sortObjectKeys sorts keys recursively without mutating the original object', () => {
  const input = {
    beta: 1,
    alpha: { zebra: 1, ant: 2 },
    list: [
      { delta: 4, charlie: 3 },
      'value'
    ]
  };

  const clone = JSON.parse(JSON.stringify(input));
  const sorted = sortObjectKeys(input);

  assert.deepEqual(Object.keys(sorted), ['alpha', 'beta', 'list']);
  assert.deepEqual(Object.keys(sorted.alpha), ['ant', 'zebra']);
  assert.deepEqual(Object.keys(sorted.list[0]), ['charlie', 'delta']);
  assert.deepEqual(input, clone, 'sortObjectKeys should not mutate original input');
});
