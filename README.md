# Bingo!

This repository stores the components for making a game of Bingo!

## Getting Started

First, install dependencies and build the shared configuration package:

```bash
pnpm install
pnpm build --filter=@repo/vitest-config
```

## Available Commands

- `pnpm test`: Runs tests in each package using Turborepo (leverages caching)
- `pnpm test:projects`: Runs tests using Vitest's projects feature
- `pnpm test:projects:watch`: Runs tests using Vitest's projects feature in watch mode
- `pnpm view-report`: Collects coverage from each package and shows it in a merged report
