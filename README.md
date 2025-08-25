# 🚀 Plesk Template

A comprehensive GitHub repository template for Plesk projects and server management tools. This template provides everything you need to create a professional, collaborative open-source project.

## ✨ Features

- **📚 Professional Documentation** - Complete README, contributing guidelines, code of conduct, and support documentation
- **🐛 Issue & PR Templates** - Structured templates for bug reports and feature requests
- **⚡ CI/CD Pipeline** - GitHub Actions workflow for automated testing and deployment
- **🔧 Code Quality Tools** - ESLint, Prettier, Jest testing framework pre-configured
- **🐳 Docker Support** - Dockerfile and docker-compose.yml for consistent environments
- **📋 Project Management** - Makefile with common commands, changelog template, and security policies
- **🌐 Working Web Application** - Simple HTTP server with API endpoints to demonstrate functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/samanad/plesk.git
```

2. **Navigate to the project directory**
```bash
cd plesk
```

3. **Install dependencies**
```bash
npm install
```

4. **Start the application**
```bash
npm start
```

5. **Visit your application**
   - Main page: `http://localhost:3000`
   - API status: `http://localhost:3000/api/status`
   - API info: `http://localhost:3000/api/info`

## 🔧 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Project Structure

```
plesk/
├── src/                    # Source code
│   ├── index.js           # Main application server
│   ├── config.js          # Configuration file
│   ├── utils.js           # Utility functions
│   └── __tests__/         # Test files
├── .github/                # GitHub templates and workflows
├── docs/                   # Documentation files
├── package.json            # Dependencies and scripts
├── README.md               # This file
├── CONTRIBUTING.md         # Contribution guidelines
├── CODE_OF_CONDUCT.md      # Community code of conduct
├── LICENSE                 # MIT License
├── CHANGELOG.md            # Version history
├── SECURITY.md             # Security policy
├── SUPPORT.md              # Support resources
├── Dockerfile              # Docker containerization
├── docker-compose.yml      # Multi-service setup
├── Makefile                # Common development commands
└── .gitignore              # Git ignore patterns
```

## 🌐 API Endpoints

The template includes a simple API to demonstrate functionality:

- **`GET /`** - Main HTML page with template information
- **`GET /api/status`** - Server status and version information
- **`GET /api/info`** - Project information and features list

## 🐳 Docker Support

### Quick Start with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t plesk-template .
docker run -p 3000:3000 plesk-template
```

### Docker Compose Services

- **app** - Main Node.js application
- **db** - PostgreSQL database (optional)
- **redis** - Redis cache (optional)
- **nginx** - Reverse proxy (optional)

## 🧪 Testing

The template includes a comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📚 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to this project
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** - Community behavior guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
- **[SECURITY.md](SECURITY.md)** - Security policy and vulnerability reporting
- **[SUPPORT.md](SUPPORT.md)** - Getting help and support resources

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- How to submit issues and feature requests
- How to contribute code
- Our development workflow
- Code style guidelines

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

We take security seriously. Please report any security vulnerabilities to our security team as described in [SECURITY.md](SECURITY.md).

## 📞 Support

Need help? Check out our [Support Guide](SUPPORT.md) or:

- Create an [issue](https://github.com/samanad/plesk/issues) for bugs or feature requests
- Start a [discussion](https://github.com/samanad/plesk/discussions) for questions
- Review our [documentation](README.md) for setup and usage guides

## 🙏 Acknowledgments

- Built with ❤️ for the open-source community
- Inspired by best practices from successful open-source projects
- Designed to make project setup easier for developers and teams

---

**Ready to power your next open-source project?** 🚀

[Fork this template](https://github.com/samanad/plesk/fork) and start building something amazing!
