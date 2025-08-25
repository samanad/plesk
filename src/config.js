// Import Plesk configuration
const pleskConfig = require('../plesk.config');

module.exports = {
  // Application configuration
  app: {
    name: 'Plesk Template',
    version: '1.0.0',
    description: 'A comprehensive GitHub repository template for professional projects',
    author: 'samanad',
    repository: 'https://github.com/samanad/plesk'
  },

  // Server configuration - Fully Plesk compatible
  server: {
    port: pleskConfig.environment.port,
    host: pleskConfig.environment.host,
    environment: pleskConfig.environment.nodeEnv,
    // Plesk specific configurations
    plesk: {
      domain: pleskConfig.environment.domain,
      ssl: pleskConfig.environment.ssl,
      proxy: pleskConfig.environment.proxy,
      isPlesk: pleskConfig.isPlesk
    }
  },

  // API configuration
  api: {
    version: 'v1',
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },

  // Features configuration
  features: {
    documentation: true,
    issueTemplates: true,
    ciCd: true,
    codeQuality: true,
    docker: true,
    testing: true
  },

  // Development tools
  tools: {
    eslint: true,
    prettier: true,
    jest: true,
    husky: true,
    lintStaged: true
  }
};
