.PHONY: help install install-dev build test test-watch lint lint-fix format clean docker-build docker-run docker-stop docker-clean deploy

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install production dependencies"
	@echo "  install-dev  - Install development dependencies"
	@echo "  build        - Build the project"
	@echo "  start        - Start the application"
	@echo "  dev          - Start development server"
	@echo "  test         - Run tests"
	@echo "  test-watch   - Run tests in watch mode"
	@echo "  test-coverage - Run tests with coverage"
	@echo "  lint         - Run linter"
	@echo "  lint-fix     - Fix linting issues"
	@echo "  format       - Format code with Prettier"
	@echo "  clean        - Clean build artifacts"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run   - Run with Docker Compose"
	@echo "  docker-stop  - Stop Docker services"
	@echo "  docker-clean - Clean Docker containers and images"
	@echo "  deploy       - Deploy to production"

# Install dependencies
install:
	npm ci --only=production

install-dev:
	npm ci

# Build the project
build:
	npm run build

# Start the application
start:
	npm start

# Start development server
dev:
	npm run dev

# Testing
test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

# Code quality
lint:
	npm run lint

lint-fix:
	npm run lint:fix

format:
	npm run format

# Clean up
clean:
	npm run clean

# Docker commands
docker-build:
	docker build -t project-name .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

docker-clean:
	docker-compose down -v --rmi all
	docker system prune -f

# Deployment
deploy:
	@echo "Deploying to production..."
	git push origin main
	@echo "Deployment triggered!"

# Development setup
setup: install-dev
	@echo "Setting up development environment..."
	cp .env.example .env
	@echo "Please edit .env file with your configuration"
	@echo "Development environment setup complete!"

# Quick development workflow
dev-workflow: lint test build
	@echo "Development workflow completed successfully!"

# Production preparation
prod-prep: clean install build test
	@echo "Production preparation completed!"
