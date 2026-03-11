# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a learning repository for TypeScript containing exercises, projects, and workshop materials from multiple courses (Fireship, Udemy - Maximilian Schwarzmüller, LinkedIn Learning, and Héctor Plata's type-level programming workshop).

## Workspace Structure

This is a PNPM monorepo workspace defined in `pnpm-workspace.yaml`:

- `projects/*` - Standalone TypeScript projects (01-tic-tac-toe through 05-wikisearch)
- `workshop*` - Type-level programming workshop by Héctor Plata

## Development Commands

### Root Level

- `pnpm start` - Runs dev mode for all workspace packages concurrently

### Individual Projects

Each project in `/projects` has its own build system:

**01-tic-tac-toe** (Parcel):

- `pnpm start` - Dev server with hot reload
- `pnpm build` - Production build

**02-maps** (Webpack):

- `pnpm start` - Webpack dev server
- `pnpm build` - Production build (uses `webpack.config.prod.js`)

**03-planner, 04-restapi** (Webpack):

- Same commands as 02-maps

**05-wikisearch** (Webpack):

- Same commands as 02-maps

### Workshop

Located in `/workshop`:

- Uses vanilla TypeScript with `tsc`
- `npx tsc` - Compile TypeScript (outputs to same directory)
- Source files in `src/` organized by level:
  - `01-fundamentals/` - Basic type concepts
  - `02-intermidiate/` - Intermediate patterns
  - `03-advance/` - Advanced type manipulation
  - `04-challenge/` - Type challenges

### Exercises

Located in `/excersices` (note: spelled with 'c'):

- Standalone `.ts` files for practicing specific concepts
- Run with: `npx ts-node <filename.ts>` or compile with `tsc` first
- Files follow naming: `##-description.ts` (e.g., `01-add.ts`, `02-uy-types.ts`)

## Project Architecture

### Exercises (`/excersices`)

Simple TypeScript files demonstrating specific concepts:

- Type annotations and inference
- Interfaces and type aliases
- ES6 features with TypeScript
- Module system
- Classes

### Projects (`/projects`)

Self-contained applications, each with independent dependencies:

- **01-tic-tac-toe**: DOM-based game using Parcel
- **02-maps**: Google Maps integration using Webpack
- **03-planner**: Project management app
- **04-rest-api**: REST API consumption
- **05-wiki-search**: Wikipedia search interface

Each project has its own:

- `package.json` with dependencies
- `tsconfig.json` with compiler options
- Build tooling configuration (webpack.config.js or Parcel)

### Workshop (`/workshop`)

Type-level programming focus:

- Minimal dependencies (just TypeScript)
- Organized by difficulty: fundamentals → intermediate → advanced → challenges
- Uses strict compiler settings: `noImplicitAny: true`, `strict: true`

### Documentation (`/docs`)

Learning notes organized by source:

- `fireship/` - Fireship TypeScript course notes
- `udemy/` - Understanding TypeScript course (Maximilian Schwarzmüller)
- `linkedin/` - LinkedIn Learning materials

## TypeScript Configuration Patterns

### Modern Projects (Parcel-based)

- Target: ES2015+
- Module: ES modules
- Decorators enabled for some projects

### Legacy Projects (Webpack-based)

- Target: ES2015
- Module: CommonJS
- TypeScript 4.x

### Workshop

- Target: ES2015
- Module: CommonJS
- Strict mode enabled
- Source maps enabled

## Running Individual TypeScript Files

For standalone files in exercises or workshop:

```bash
# Option 1: Compile then run
npx tsc <file.ts> --outDir ./dist && node ./dist/<file.js>

# Option 2: Using ts-node (if installed)
npx ts-node <file.ts>

# Option 3: Using tsx (faster)
npx tsx <file.ts>
```
