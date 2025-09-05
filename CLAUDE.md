# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project configured for static export and GitHub Pages deployment. The site appears to be for Hero4Hire (www-hero4hire-com) and uses a modern stack with:
- Next.js 15 with App Router and Turbopack
- TypeScript with strict configuration
- TailwindCSS v4 for styling
- Biome for linting and formatting (replaces ESLint/Prettier)
- Vitest + React Testing Library for testing
- Velite for content management
- pnpm as package manager

## Key Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server (serves static export)

### Code Quality
- `pnpm lint` - Run Biome linting (equivalent to `biome check`)
- `pnpm format` - Format code with Biome

### Testing
- `pnpm test` - Run Vitest test suite
- `pnpm test --watch` - Run tests in watch mode
- `pnpm test --coverage` - Run tests with coverage report

### Deployment
- `pnpm deploy` - Build and deploy to GitHub Pages via git subtree to `gh-pages` branch
- GitHub Actions automatically deploys on push to main branch

## Architecture

### Static Export Configuration
The project is configured for static generation (`output: "export"`) with:
- Build output goes to `./out` directory
- Images are unoptimized for static hosting compatibility
- GitHub Pages deployment via both manual git subtree and GitHub Actions

### Content Management
- Markdown content in `_posts/` directory with frontmatter
- Velite dependency suggests content processing capabilities
- Gray-matter and remark for markdown processing

### Styling System
- TailwindCSS v4 with PostCSS integration
- Geist font family (sans and mono) via next/font/google
- Path aliases: `@/*` maps to `./src/*`

### Testing Framework
- Vitest for unit testing with React Testing Library
- jsdom environment for DOM testing
- vite-tsconfig-paths for TypeScript path resolution in tests

### Development Tools
- Biome handles both linting and formatting with Next.js and React rules
- TypeScript strict mode enabled
- VSCode workspace configured with local TypeScript SDK

## Key Configuration Files

- `next.config.ts` - Static export configuration for GitHub Pages
- `biome.json` - Linting and formatting rules
- `tsconfig.json` - TypeScript configuration with path aliases
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `package.json` - pnpm scripts and dependencies