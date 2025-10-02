# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with Convex backend and Convex Auth for authentication. The stack includes:
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4, shadcn/ui components
- **Backend**: Convex (database + serverless functions)
- **Auth**: @convex-dev/auth with Password provider
- **Styling**: Tailwind CSS with next-themes for dark mode
- **Linting/Formatting**: Biome (not ESLint/Prettier)

## Development Commands

### Running the app
```bash
npm run dev              # Run both frontend and backend in parallel
npm run dev:frontend     # Run only Next.js dev server (port 3000)
npm run dev:backend      # Run only Convex dev server
```

The `predev` script runs automatically before `npm run dev` to:
1. Wait for Convex to be ready
2. Run setup.mjs to configure Convex Auth
3. Open Convex dashboard

### Code quality
```bash
npm run lint             # Check code with Biome
npm run lint:fix         # Fix issues automatically
npm run format           # Format code
```

### Build
```bash
npm run build            # Build Next.js app
npm start                # Start production server
```

## Architecture

### Authentication Flow
- `convex/auth.ts`: Configures Convex Auth with Password provider
- `convex/http.ts`: HTTP router that exposes auth endpoints
- `src/middleware.ts`: Next.js middleware for route protection
  - `/login` and `/register` redirect to `/dash` if authenticated
  - `/dash` requires authentication, redirects to `/login` if not
- `src/components/ConvexClientProvider.tsx`: Client-side Convex setup with auth
- Root layout wraps app with ConvexAuthNextjsServerProvider for server-side auth

### Route Structure
- `src/app/(home)/*`: Public home routes
- `src/app/(auth)/*`: Auth pages (login, register) with shared layout
- `src/app/dash/*`: Protected dashboard routes
- Route groups use parentheses for organization without affecting URL structure

### Convex Backend
- `convex/schema.ts`: Database schema with auth tables and users table
  - Users table extends auth with optional name, email, phone, image fields
  - Email is indexed for lookups
- `convex/_generated/`: Auto-generated types (do not edit manually)
- All Convex functions must use Convex's type system (v.string(), v.number(), etc.)

### Styling & Components
- `src/components/ui/*`: shadcn/ui components (pre-configured, can be modified)
- `src/styles/globals.css`: Global styles with Tailwind base
- Theme managed via next-themes (ThemeProvider in root layout)
- Biome enforces tabs for indentation, double quotes, and 100-char line width

### Path Aliases
- `@/*` → `src/*`
- `@/convex/*` → `convex/*`

## Key Development Notes

### Working with Convex
- Functions in `convex/` directory are automatically deployed
- Use `ctx.auth.getUserIdentity()` to get current user in mutations/queries
- Schema changes are applied automatically but may require migration for production
- Generated API types are in `convex/_generated/api.d.ts`

### Code Style (Biome)
- Uses tabs (not spaces)
- Semicolons only when needed
- Double quotes for strings
- 100 character line width
- Run `npm run lint:fix` before committing

### Environment Variables
- `NEXT_PUBLIC_CONVEX_URL`: Required for client-side Convex connection
- Set up via `.env.local` (created during initial setup)
