// jest.setup.cjs
// bring in all jest‑dom matchers
require('@testing-library/jest-dom');

// polyfill missing globals in jsdom
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
