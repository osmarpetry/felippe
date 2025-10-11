# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application bootstrapped with `create-next-app`, using:
- **React 19** with Server Components
- **Turbopack** as the bundler
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Biome** for linting and formatting (instead of ESLint/Prettier)

## Development Commands

### Starting Development
```bash
npm run dev
```
Starts the development server with Turbopack on http://localhost:3000

### Building
```bash
npm run build
```
Creates an optimized production build with Turbopack

### Starting Production Server
```bash
npm start
```
Runs the production server (requires a build first)

### Code Quality
```bash
npm run lint        # Check code with Biome
npm run format      # Format code with Biome
```

## Architecture

### Project Structure
- **App Router**: Uses Next.js 15's App Router (not Pages Router)
- **Entry Points**:
  - `src/app/layout.tsx` - Root layout with Geist fonts configuration
  - `src/app/page.tsx` - Home page (Server Component by default)
  - `src/app/globals.css` - Global styles and Tailwind imports

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Use `@/` imports for all internal module references

### Styling
- Tailwind CSS v4 with the new PostCSS plugin (`@tailwindcss/postcss`)
- No `tailwind.config.js` needed - uses v4's automatic configuration
- CSS variables for theming: `--font-geist-sans`, `--font-geist-mono`
- Dark mode classes are available via Tailwind's `dark:` prefix

### Biome Configuration
- **Formatter**: 2-space indentation
- **Linter**: Recommended rules with Next.js and React domain-specific rules
- **Import organization**: Auto-sorts imports on save
- `noUnknownAtRules` disabled (for Tailwind CSS compatibility)

## TypeScript Configuration
- **Target**: ES2017
- **Module Resolution**: Bundler (Next.js 15's default)
- **Strict Mode**: Enabled
- **JSX**: Preserve (handled by Next.js)
- The Next.js TypeScript plugin is configured for enhanced IDE support

## Key Conventions
- All React components are Server Components by default
- Use `"use client"` directive only when client-side interactivity is needed
- Biome handles both linting and formatting - don't use ESLint or Prettier commands
- Use `next/image` for all images (as seen in page.tsx)
- Use `next/font/google` for Google Fonts optimization
