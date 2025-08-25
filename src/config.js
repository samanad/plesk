module.exports = {
  // Application configuration
  app: {
    name: 'Plesk Template',
    version: '1.0.0',
    description: 'A comprehensive GitHub repository template for professional projects',
    author: 'samanad',
    repository: 'https://github.com/samanad/plesk'
  },

  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    environment: process.env.NODE_ENV || 'development'
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
