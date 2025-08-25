# 🚀 Plesk Deployment Guide

## Quick Start

### Option 1: Using npm start (Recommended)
```bash
# Simply run - Plesk handles everything automatically
npm start
```

### Option 2: Direct node command
```bash
# Plesk automatically assigns ports and handles routing
node src/index.js
```

## 🎯 Plesk Automatic Features

✅ **Automatic Port Assignment** - Plesk assigns available ports automatically  
✅ **Domain Routing** - Your app is automatically available via your domain  
✅ **SSL/HTTPS Support** - Plesk handles SSL certificates automatically  
✅ **Load Balancing** - Plesk can distribute traffic across multiple instances  
✅ **Auto-restart** - Plesk restarts your app if it crashes  
✅ **Log Management** - Centralized logging through Plesk panel

## Troubleshooting

### Port Already in Use (EADDRINUSE)
If you get `EADDRINUSE: address already in use :::3000`:

**✅ Plesk Solution (Recommended):**
- Simply restart your application in the Plesk panel
- Plesk will automatically assign a different port
- No manual intervention needed

**Manual Solution (if needed):**
```bash
# Find the process
lsof -i :3000

# Kill it (replace PID with actual process ID)
kill -9 <PID>
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

## 🚀 Plesk Deployment

### Automatic Deployment (Recommended)
1. **Upload your code** to `/var/www/vhosts/yourdomain.com/httpdocs/`
2. **Install dependencies**: `npm install`
3. **Start the application**: `npm start`
4. **Plesk handles everything else automatically!**

### Plesk Panel Configuration
1. **Go to Domains** → **yourdomain.com** → **Node.js**
2. **Enable Node.js** for your domain
3. **Set Document Root** to `/httpdocs`
4. **Set Application Root** to `/httpdocs`
5. **Set Application URL** to `/`
6. **Set Node.js Version** to 16 or higher
7. **Set Application Startup File** to `src/index.js`
8. **Click Enable**

### Environment Variables in Plesk
Plesk automatically sets these environment variables:
- `VIRTUAL_HOST` - Your domain name
- `VIRTUAL_PORT` - Assigned port
- `DOMAIN` - Your domain
- `SSL` - SSL status
- `PROXY` - Proxy configuration

### Manual Deployment (Alternative)
If you prefer manual control:

```bash
# Navigate to your domain directory
cd /var/www/vhosts/yourdomain.com/httpdocs

# Install dependencies
npm install

# Start the application
npm start

# Plesk will automatically route traffic to your app
```

## 🌐 Plesk Domain Access

### Automatic Domain Routing
Once deployed in Plesk, your app is automatically available at:
- **HTTP**: `http://yourdomain.com`
- **HTTPS**: `https://yourdomain.com` (if SSL enabled)

### Health Check via Domain
Test if your server is running via your domain:
```bash
# Check status
curl http://yourdomain.com/api/status

# Check info
curl http://yourdomain.com/api/info

# Check main page
curl http://yourdomain.com/
```

### Local Health Check (Development)
For local testing:
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
