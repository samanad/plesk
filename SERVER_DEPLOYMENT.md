# 🚀 Server Deployment Guide

## Quick Start

### Option 1: Using npm scripts (Recommended)
```bash
# Start on default port 3000
npm start

# Start on custom port
PORT=3001 npm start

# Start in production mode
npm run start:prod

# Start in development mode
npm run start:dev
```

### Option 2: Using the startup script
```bash
# Make script executable (first time only)
chmod +x start-server.sh

# Run the interactive startup script
./start-server.sh
```

### Option 3: Direct node command
```bash
# Start on default port 3000
node src/index.js

# Start on custom port
PORT=3001 node src/index.js

# Start with specific host
HOST=0.0.0.0 PORT=3000 node src/index.js
```

## Troubleshooting

### Port Already in Use (EADDRINUSE)
If you get `EADDRINUSE: address already in use :::3000`:

**Option 1: Use a different port**
```bash
PORT=3001 npm start
```

**Option 2: Find and kill the process using port 3000**
```bash
# Find the process
lsof -i :3000

# Kill it (replace PID with actual process ID)
kill -9 <PID>
```

**Option 3: Kill all Node.js processes (be careful!)**
```bash
pkill -f node
```

### File Not Found Errors
- Make sure you're in the correct directory
- Run `ls -la` to verify files exist
- Check that `src/index.js` exists

### Permission Issues
```bash
# Make sure the startup script is executable
chmod +x start-server.sh

# Check file permissions
ls -la start-server.sh
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port number |
| `HOST` | 0.0.0.0 | Server host binding |
| `NODE_ENV` | development | Environment mode |

## Production Deployment

### Using PM2 (Recommended for production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start src/index.js --name "plesk-template"

# Monitor the application
pm2 monit

# View logs
pm2 logs plesk-template
```

### Using systemd service
Create `/etc/systemd/system/plesk-template.service`:
```ini
[Unit]
Description=Plesk Template Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/vhosts/zeshk.com/httpdocs
ExecStart=/usr/bin/node src/index.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

Then enable and start:
```bash
sudo systemctl enable plesk-template
sudo systemctl start plesk-template
sudo systemctl status plesk-template
```

## Health Check

Test if your server is running:
```bash
# Check status
curl http://localhost:3000/api/status

# Check info
curl http://localhost:3000/api/info

# Check main page
curl http://localhost:3000/
```

## Logs and Monitoring

### View real-time logs
```bash
# If using npm start
npm start

# If using PM2
pm2 logs plesk-template --lines 100

# If using systemd
sudo journalctl -u plesk-template -f
```

### Check server status
```bash
# Check if port is listening
netstat -tlnp | grep :3000

# Check process
ps aux | grep node
```

## Security Notes

- The server runs on `0.0.0.0` by default (binds to all interfaces)
- CORS is enabled for all origins (`*`) - restrict this in production
- No authentication is implemented - add this for production use
- Consider using HTTPS in production

## Support

If you encounter issues:
1. Check the logs for error messages
2. Verify all dependencies are installed (`npm install`)
3. Check file permissions and ownership
4. Ensure the correct Node.js version is installed (>=16.0.0)
