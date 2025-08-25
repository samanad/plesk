const http = require('http');
const path = require('path');
const fs = require('fs');

// Create server function (exported for testing)
function createServer() {
  const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Simple routing
    if (req.url === '/' || req.url === '/index.html') {
      serveHTML(res, 'index.html');
    } else if (req.url === '/api/status') {
      serveJSON(res, { 
        status: 'running', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      });
    } else if (req.url === '/api/info') {
      serveJSON(res, {
        name: 'Plesk Template',
        description: 'A comprehensive GitHub repository template',
        repository: 'https://github.com/samanad/plesk',
        features: [
          'Professional documentation',
          'Issue and PR templates',
          'CI/CD pipeline',
          'Code quality tools',
          'Docker support',
          'Testing framework'
        ]
      });
    } else {
      // Try to serve static files
      const filePath = path.join(__dirname, '..', 'public', req.url);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(res, filePath);
      } else {
        serve404(res);
      }
    }
  });

  return server;
}

function serveHTML(res, filename) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Plesk Template - GitHub Repository Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }
        .header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 2rem;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .feature-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .feature-card h3 {
            color: #667eea;
            margin-bottom: 0.5rem;
        }
        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
            margin: 0.5rem 0.5rem 0.5rem 0;
        }
        .btn:hover {
            background: #5a6fd8;
        }
        .status {
            background: #e8f5e8;
            border: 1px solid #4caf50;
            color: #2e7d32;
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
        }
        .footer {
            text-align: center;
            color: white;
            opacity: 0.8;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Plesk Template</h1>
            <p>A comprehensive GitHub repository template for professional projects</p>
        </div>

        <div class="content">
            <h2>✨ What You Get</h2>
            <p>This template provides everything you need to create a professional, collaborative open-source project:</p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h3>📚 Documentation</h3>
                    <p>Professional README, contributing guidelines, code of conduct, and support documentation.</p>
                </div>
                <div class="feature-card">
                    <h3>🐛 Issue Templates</h3>
                    <p>Structured templates for bug reports and feature requests to improve project management.</p>
                </div>
                <div class="feature-card">
                    <h3>⚡ CI/CD Pipeline</h3>
                    <p>GitHub Actions workflow for automated testing, building, and deployment.</p>
                </div>
                <div class="feature-card">
                    <h3>🔧 Development Tools</h3>
                    <p>ESLint, Prettier, Jest testing, and other code quality tools pre-configured.</p>
                </div>
                <div class="feature-card">
                    <h3>🐳 Docker Support</h3>
                    <p>Dockerfile and docker-compose.yml for consistent development environments.</p>
                </div>
                <div class="feature-card">
                    <h3>📋 Project Management</h3>
                    <p>Makefile with common commands, changelog template, and security policies.</p>
                </div>
            </div>

            <div class="status">
                <strong>✅ Status:</strong> Template is working correctly! Server is running and responding to requests.
            </div>

            <h3>🚀 Quick Start</h3>
            <p>To use this template for your own project:</p>
            <ol>
                <li>Fork this repository</li>
                <li>Customize the content for your project</li>
                <li>Update the configuration files</li>
                <li>Start building your amazing project!</li>
            </ol>

            <div style="margin-top: 2rem;">
                <a href="https://github.com/samanad/plesk" class="btn">📖 View on GitHub</a>
                <a href="https://github.com/samanad/plesk/fork" class="btn">🍴 Fork Template</a>
                <a href="https://github.com/samanad/plesk/issues" class="btn">🐛 Report Issues</a>
                <a href="https://github.com/samanad/plesk/discussions" class="btn">💬 Join Discussion</a>
            </div>
        </div>

        <div class="content">
            <h2>🔧 API Endpoints</h2>
            <p>This template includes a simple API to demonstrate functionality:</p>
            <ul>
                <li><code>/api/status</code> - Server status and version information</li>
                <li><code>/api/info</code> - Project information and features</li>
            </ul>
            <p>Try them out to see the template in action!</p>
        </div>

        <div class="footer">
            <p>Built with ❤️ using the Plesk Template</p>
            <p>Ready to power your next open-source project</p>
        </div>
    </div>

    <script>
        // Simple status check
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                console.log('Server Status:', data);
            })
            .catch(error => {
                console.error('Error fetching status:', error);
            });
    </script>
</body>
</html>`;
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function serveJSON(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
  }[ext] || 'text/plain';

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
}

function serve404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>404 - Not Found</title></head>
    <body>
        <h1>404 - Page Not Found</h1>
        <p>The requested resource was not found on this server.</p>
        <a href="/">Go back home</a>
    </body>
    </html>
  `);
}

// Export for testing
module.exports = { createServer };

// Start server if this file is run directly
if (require.main === module) {
  const server = createServer();
  
  // Start server with better error handling
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  
  server.listen(PORT, HOST, () => {
    console.log(`🚀 Plesk Template server running on ${HOST}:${PORT}`);
    console.log(`📖 Visit http://localhost:${PORT} to see the template`);
    console.log(`🔧 API available at http://localhost:${PORT}/api/status`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use!`);
      console.error(`💡 Try using a different port: PORT=3001 node src/index.js`);
      console.error(`💡 Or kill the process using port ${PORT}: lsof -i :${PORT}`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
      process.exit(1);
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('🔄 SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
}
