# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hero4Hire is a modern blog/content website built with Next.js 15, React 19, and TypeScript. It uses Content Collections for content management and deploys as a static site to GitHub Pages.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production with Turbopack
- `pnpm lint` - Run Biome linting
- `pnpm format` - Format code with Biome
- `pnpm test` - Run Vitest tests

### Package Manager
Uses **pnpm** - ensure you use `pnpm` commands, not npm or yarn.

## Architecture

### Tech Stack
- **Next.js 15** with App Router
- **React 19** and TypeScript 5
- **Tailwind CSS v4** for styling
- **Content Collections** for content management
- **MDX** for rich markdown content
- **Biome** for linting/formatting (no ESLint/Prettier)
- **Vitest** for testing

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `content/posts/` - Blog posts as MDX files with year-based organization
- `content/authors/` - Author information
- `public/` - Static assets

### Content Management
- Posts are MDX files in `/content/posts/` with frontmatter: `title`, `summary`, `datePosted`
- Content schema defined in `content-collections.ts`
- Automatic slug generation and date parsing

## Configuration Files

### Critical Files
- `biome.json` - Linting and formatting rules (replaces ESLint/Prettier config)
- `content-collections.ts` - Content schema and transformation logic
- `next.config.ts` - Next.js config with Content Collections integration
- `tsconfig.json` - TypeScript config with path aliases

### Styling
- Uses Tailwind CSS v4 with custom theme in `src/app/globals.css`
- OKLCH color space with dark mode support
- Typography plugin for prose content

## Deployment

- Automated deployment via GitHub Actions (`.github/workflows/deploy.yml`)
- Builds and deploys to GitHub Pages on push to `main`
- Static site generation with Next.js export

## Development Notes

- Use Biome for all linting/formatting - no separate ESLint or Prettier
- Content Collections handles content processing and type generation
- App Router architecture - pages go in `src/app/`
- Images and assets go in `public/`
- Always run `pnpm lint` and `pnpm build` before committing