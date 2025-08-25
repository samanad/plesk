const http = require('http');

// Mock environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Import the server (we'll need to modify the original to make it testable)
let server;

// Test utilities
const testUtils = {
  // Helper to make HTTP requests
  request: (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3001,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
      }

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            const jsonBody = JSON.parse(body);
            resolve({ status: res.statusCode, headers: res.headers, body: jsonBody });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, body: body });
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  },

  // Helper to wait
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

describe('Plesk Template API', () => {
  beforeAll(async () => {
    // Start the server for testing
    const { createServer } = require('../index');
    server = createServer();
    await testUtils.wait(100); // Wait for server to start
  });

  afterAll(async () => {
    // Clean up
    if (server) {
      server.close();
    }
  });

  describe('GET /api/status', () => {
    it('should return server status', async () => {
      const response = await testUtils.request('/api/status');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
      expect(response.body.status).toBe('running');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('GET /api/info', () => {
    it('should return project information', async () => {
      const response = await testUtils.request('/api/info');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('repository');
      expect(response.body).toHaveProperty('features');
      expect(response.body.name).toBe('Plesk Template');
      expect(response.body.repository).toBe('https://github.com/samanad/plesk');
      expect(Array.isArray(response.body.features)).toBe(true);
    });
  });

  describe('GET / (root)', () => {
    it('should return HTML page', async () => {
      const response = await testUtils.request('/');
      
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.body).toContain('🚀 Plesk Template');
      expect(response.body).toContain('GitHub repository template');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await testUtils.request('/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.body).toContain('404 - Page Not Found');
    });
  });
});

describe('Utility Functions', () => {
  const utils = require('../utils');

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      const formatted = utils.formatDate(date);
      
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('January 1, 2024');
    });
  });

  describe('generateRandomString', () => {
    it('should generate string of specified length', () => {
      const length = 10;
      const result = utils.generateRandomString(length);
      
      expect(result).toHaveLength(length);
      expect(typeof result).toBe('string');
    });

    it('should generate string of default length', () => {
      const result = utils.generateRandomString();
      
      expect(result).toHaveLength(8);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(utils.isValidEmail('test@example.com')).toBe(true);
      expect(utils.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(utils.isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(utils.isValidEmail('invalid-email')).toBe(false);
      expect(utils.isValidEmail('test@')).toBe(false);
      expect(utils.isValidEmail('@example.com')).toBe(false);
      expect(utils.isValidEmail('')).toBe(false);
    });
  });

  describe('sanitizeHTML', () => {
    it('should sanitize HTML characters', () => {
      const input = '<script>alert("xss")</script>';
      const sanitized = utils.sanitizeHTML(input);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });
  });

  describe('getSystemInfo', () => {
    it('should return system information', () => {
      const info = utils.getSystemInfo();
      
      expect(info).toHaveProperty('nodeVersion');
      expect(info).toHaveProperty('platform');
      expect(info).toHaveProperty('arch');
      expect(info).toHaveProperty('memoryUsage');
      expect(info).toHaveProperty('uptime');
      expect(info).toHaveProperty('pid');
    });
  });

  describe('safeJSONParse', () => {
    it('should parse valid JSON', () => {
      const validJSON = '{"key": "value"}';
      const result = utils.safeJSONParse(validJSON);
      
      expect(result).toEqual({ key: 'value' });
    });

    it('should return default value for invalid JSON', () => {
      const invalidJSON = '{"key": "value"';
      const defaultValue = { error: 'default' };
      const result = utils.safeJSONParse(invalidJSON, defaultValue);
      
      expect(result).toEqual(defaultValue);
    });
  });

  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(utils.deepClone(42)).toBe(42);
      expect(utils.deepClone('test')).toBe('test');
      expect(utils.deepClone(null)).toBe(null);
    });

    it('should clone objects deeply', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = utils.deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('should clone arrays deeply', () => {
      const original = [1, [2, 3], { a: 4 }];
      const cloned = utils.deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
      expect(cloned[2]).not.toBe(original[2]);
    });
  });
});
