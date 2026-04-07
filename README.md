# Understanding TypeScript

Repo to store learning and sandboxes with vanilla TypeScript.

## Project Overview

This is a learning repository for TypeScript containing exercises, projects, and workshop materials from multiple courses including Fireship, Udemy (Maximilian Schwarzmüller), LinkedIn Learning, and Héctor Plata's type-level programming workshop.

![TypeScript Dad Joke](images/ts-dad-joke.png)

## Tech Stack

- **TypeScript** - Primary language
- **Node.js** - Runtime environment
- **Package Manager**: PNPM (monorepo workspace)
- **Build Tools**: Parcel, Webpack, Vite
- **Frameworks/Libraries**: Express, Solid.js, fp-ts, Zod
- **Build System**: NX for monorepo management

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PNPM installed globally: `npm install -g pnpm`

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd understanding-typescript

# Install all dependencies
pnpm install
```

## Commands

### Root Level

| Command | Description |
|---------|-------------|
| `pnpm start` | Runs dev mode for all workspace packages concurrently |

### NX Commands (Recommended)

| Command | Description |
|---------|-------------|
| `pnpm nx start 02-maps` | Start maps project |
| `pnpm nx start 03-planner` | Start planner project |
| `pnpm nx start 05-wiki-search` | Start wiki-search project |

### Individual Projects

#### 01-tic-tac-toe (Parcel)
| Command | Description |
|---------|-------------|
| `pnpm start` | Dev server with hot reload |
| `pnpm build` | Production build |

#### 02-maps (Webpack)
| Command | Description |
|---------|-------------|
| `pnpm start` | Webpack dev server |
| `pnpm build` | Production build |

#### 03-planner (Webpack)
| Command | Description |
|---------|-------------|
| `pnpm start` | Webpack dev server |
| `pnpm build` | Production build |

#### 04-rest-api (Node.js/Express)
| Command | Description |
|---------|-------------|
| `pnpm start` | Start server with nodemon |

#### 05-wiki-search (Vite + Solid.js)
| Command | Description |
|---------|-------------|
| `pnpm start` / `pnpm dev` | Vite dev server |
| `pnpm build` | Production build |
| `pnpm serve` | Preview production build |

### Workshop

Located in `/workshop`:

| Command | Description |
|---------|-------------|
| `npx tsc` | Compile TypeScript |

### Exercises

Located in `/excersices`:

```bash
# Run with ts-node
npx ts-node <filename.ts>

# Or compile first
npx tsc <file.ts> && node <file.js>
```

## Usage Examples

### Running a TypeScript File

```bash
# Using ts-node (recommended for development)
npx ts-node excersices/01-add.ts

# Using tsc + node
npx tsc excersices/01-add.ts --outDir ./dist
node dist/01-add.js
```

### Running a Project

```bash
# Start tic-tac-toe dev server
cd projects/01-tic-tac-toe
pnpm start

# Start wiki-search with Vite
cd projects/05-wiki-search
pnpm dev
```

## Project Structure

```
understanding-typescript/
├── excersices/          # Standalone TypeScript exercises
├── projects/            # Standalone TypeScript projects
│   ├── 01-tic-tac-toe   # Parcel-based game
│   ├── 02-maps          # Google Maps integration
│   ├── 03-planner       # Project management app
│   ├── 04-rest-api      # REST API with Express
│   └── 05-wiki-search   # Vite + Solid.js app
├── workshop/            # Type-level programming workshop
├── docs/                # Learning notes
└── images/              # Assets
```

## License

ISC / MIT (varies by project)
