// Jest setup file
// This file runs before each test file

// Set test timeout to 10 seconds
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to suppress console.log during tests
  // log: jest.fn(),
  // Uncomment to suppress console.warn during tests
  // warn: jest.fn(),
  // Uncomment to suppress console.error during tests
  // error: jest.fn(),
};

// Global test utilities
global.testUtils = {
  // Helper to create mock data
  createMockData: (template, overrides = {}) => ({
    ...template,
    ...overrides,
  }),
  
  // Helper to wait for async operations
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Helper to create a mock function with default implementation
  createMockFn: (defaultImpl = jest.fn()) => {
    const mockFn = jest.fn(defaultImpl);
    mockFn.mockClear = jest.fn();
    mockFn.mockReset = jest.fn();
    mockFn.mockRestore = jest.fn();
    return mockFn;
  },
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// Global beforeAll hook
beforeAll(() => {
  // Set up any global test environment
  process.env.NODE_ENV = 'test';
});

// Global afterAll hook
afterAll(() => {
  // Clean up any global test environment
  process.env.NODE_ENV = 'development';
});
