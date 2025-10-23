# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a **reusable TypeScript component library** for interacting with the Ollama API. The component is designed to be integrated into **NestJS** or **Next.js** projects, providing a wrapper for Ollama API requests.

The package is published to the **GitHub npm registry** as `@rmcquiston/ollama-api-component` and can be installed in other projects via npm.

**Reference:** [Ollama API Documentation](https://docs.ollama.com/api)

## Key Design Principles

- **Modular Integration:** Create a reusable component that works seamlessly with both NestJS (as a service/module) and Next.js (as an API route helper)
- **Type Safety:** Leverage TypeScript to provide strong typing for Ollama API requests and responses
- **Zero External Dependencies:** Where possible, minimize external dependencies to reduce bundle size and installation friction

## Common Development Commands

```bash
# Install dependencies
npm install

# Build the library (TypeScript + ESM bundling)
npm run build

# Run type checking
npm run typecheck

# Lint code
npm run lint

# Format code (or check formatting)
npm run format
npm run format:check

# Clean build artifacts
npm run clean
```

## Architecture

The library provides three entry points:

### 1. Direct Usage (`@rmcquiston/ollama-api-component`)
```typescript
import { OllamaClient } from '@rmcquiston/ollama-api-component';

// Uses default URL: http://localhost:11434/api
const ollama = new OllamaClient();
const response = await ollama.generate({ model: 'llama2', prompt: 'Hello' });

// Or with custom URL
const ollama = new OllamaClient({ baseUrl: 'https://ollama.example.com/api' });
```

### 2. NestJS Integration (`@rmcquiston/ollama-api-component/nest`)
```typescript
import { OllamaModule } from '@rmcquiston/ollama-api-component/nest';

@Module({
  imports: [OllamaModule.register({ baseUrl: 'http://localhost:11434' })],
})
export class AppModule {}
```
Provides `OllamaService` for dependency injection in NestJS controllers/services.

### 3. Next.js Integration (`@rmcquiston/ollama-api-component/next`)
```typescript
import { createOllamaClient } from '@rmcquiston/ollama-api-component/next';

const ollama = createOllamaClient({ baseUrl: process.env.OLLAMA_BASE_URL });
const response = await ollama.generate({ model: 'llama2', prompt: 'Hello' });
```

### Core Files
- **src/ollama-client.ts** - Base HTTP client for Ollama API communication
- **src/nest/** - NestJS service and module
- **src/next/** - Next.js factory functions and helpers
- **src/index.ts** - Main entry point exports

## Publishing to GitHub npm Registry

### Setup (One-time)
1. Ensure `.npmrc` is configured with your GitHub username in the scoped registry
2. Authentication uses `GITHUB_TOKEN` environment variable (GitHub Actions provides this automatically)

### Publishing a Release
1. Create a version tag: `git tag v1.0.0`
2. Push tag: `git push origin v1.0.0`
3. GitHub Actions workflow automatically builds, tests, and publishes to `@rmcquiston/ollama-api-component`

The workflow is defined in `.github/workflows/publish.yml` and runs on all `v*` tags.

### Installing in Other Projects
```bash
npm install @rmcquiston/ollama-api-component
```

Requires `.npmrc` configured for GitHub Packages in consuming projects, or npm login to GitHub.

## Build System

- **TypeScript** - Compiled to ES2020 with strict mode
- **esbuild** - Fast ESM-only bundling
- **Type Declarations** - Generated alongside compiled output (`.d.ts` files)

## Code Style & Standards

- Use TypeScript strict mode
- Prefer explicit types over `any`
- Document public APIs with JSDoc comments
- ESM module syntax only (no CommonJS)

## Repository Status

- **License:** MIT (Copyright 2025 Richard McQuiston)
- **Main Branch:** `main`
- **Publishing:** Automated via GitHub Actions on version tags
