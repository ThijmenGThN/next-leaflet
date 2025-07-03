# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run lint` - Run ESLint with Next.js TypeScript rules

### Database & Types
- `npm run generate:types` - Generate TypeScript types from Payload CMS schema
- `npm run generate:importmap` - Generate import map for Payload

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and standalone output
- **CMS**: Payload CMS 3.x with PostgreSQL adapter
- **UI**: Tailwind CSS v4 with Shadcn/UI, Radix UI components
- **Email**: React Email with Nodemailer
- **Payments**: Stripe and Cryptomus integration
- **Internationalization**: next-intl (English/Dutch)

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── (payload)/         # Payload CMS admin panel
│   └── api/               # API routes (Stripe, Cryptomus)
├── backend/               # Payload CMS configuration
│   ├── collections/       # CMS collections (Users, Products, etc.)
│   └── migrations/        # Database migrations
├── components/            # React components
│   └── ui/                # Reusable UI components (Radix-based)
├── functions/             # Server actions and utilities
├── lib/                   # Third-party service configurations
├── locales/               # Internationalization files
└── types/                 # TypeScript definitions
```

### Key Collections
The CMS manages these core collections:
- **Users**: Authentication with role-based access (admin/user)

### Type Safety
- Auto-generated types from Payload schema at `src/types/payload-types.ts`
- TypeScript paths configured for `@/*` imports
