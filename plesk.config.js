// Plesk-specific configuration
// This file automatically detects Plesk environment and configures the server

const pleskConfig = {
  // Detect if running in Plesk
  isPlesk: process.env.PLESK_VERSION || process.env.VIRTUAL_HOST || process.env.DOMAIN,
  
  // Plesk environment variables
  environment: {
    port: process.env.PORT || process.env.VIRTUAL_PORT || 0, // Let Plesk assign any free port
    host: '0.0.0.0', // Always bind to all interfaces
    domain: process.env.DOMAIN || process.env.VIRTUAL_HOST,
    ssl: process.env.SSL === 'true',
    proxy: process.env.PROXY === 'true',
    nodeEnv: process.env.NODE_ENV || 'production'
  },
  
  // Plesk-specific server settings
  server: {
    // Let Plesk handle port conflicts automatically
    autoPort: true,
    // Use Plesk's virtual host configuration
    useVirtualHost: true,
    // Enable graceful shutdown for Plesk
    gracefulShutdown: true
  },
  
  // Logging configuration for Plesk
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    // Plesk log directory
    directory: process.env.PLESK_LOG_DIR || '/var/log/plesk'
  }
};

// Export configuration
module.exports = pleskConfig;

// Log Plesk detection
if (pleskConfig.isPlesk) {
  console.log('✅ Plesk environment detected');
  console.log(`🌐 Domain: ${pleskConfig.environment.domain}`);
  console.log(`🔒 SSL: ${pleskConfig.environment.ssl ? 'Enabled' : 'Disabled'}`);
  console.log(`🔄 Proxy: ${pleskConfig.environment.proxy ? 'Enabled' : 'Disabled'}`);
} else {
  console.log('ℹ️  Running in non-Plesk environment');
}
