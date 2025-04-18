// jest.config.mjs
export default {
  // 1. Browser‑like environment so TextEncoder/TextDecoder exist
  testEnvironment: 'jsdom',

  // 2. Run your custom setup (polyfills + jest-dom) _after_ the env is ready
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

  // 3. Use Babel to transform .js/.jsx/.ts/.tsx
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },

  // 4. Stub out styles & static assets
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|svg)$': '<rootDir>/__mocks__/fileMock.cjs'
  },

  // 5. Where to find your tests
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']
};
