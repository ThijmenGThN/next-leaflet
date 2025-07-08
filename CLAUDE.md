# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run lint` - Run ESLint with Next.js TypeScript rules

### Payload CMS Commands
- `npm run generate:types` - Generate TypeScript types from Payload CMS schema
- `npm run generate:importmap` - Generate import map for Payload

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and standalone output
- **CMS**: Payload CMS 3.x with PostgreSQL/SQLite adapter
- **UI**: Tailwind CSS v4 with Shadcn/UI, Radix UI components
- **Email**: React Email with Nodemailer
- **Internationalization**: next-intl (English/Dutch)
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context and server components
- **Deployment**: Docker with Node.js 18.20.2+

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── (auth)/        # Authentication pages (login, register, reset)
│   │   ├── dash/          # Dashboard pages with protected routes
│   │   └── ui/            # UI component showcase
│   ├── (payload)/         # Payload CMS admin panel
│   │   └── admin/         # Admin interface
│   └── api/               # API routes and GraphQL
├── backend/               # Payload CMS configuration
│   ├── access/            # Access control patterns
│   ├── collections/       # CMS collections (Users, etc.)
│   └── migrations/        # Database migrations
├── components/            # React components
│   └── ui/                # Shadcn/UI components with Radix primitives
├── emails/                # React Email templates
├── functions/             # Server actions and utilities
├── helpers/               # Utility functions
├── hooks/                 # Custom React hooks
├── libs/                  # Third-party configurations
├── locales/               # Internationalization files
├── styles/                # Global CSS and Tailwind
└── types/                 # TypeScript definitions
```

### Key Collections
The CMS manages these core collections:
- **Users**: Authentication with role-based access (admin/user), includes firstname, lastname, email

### Type Safety
- Auto-generated types from Payload schema at `src/types/payload-types.ts`
- TypeScript paths configured for `@/*` imports
- Strict TypeScript configuration with Next.js rules

## Code Standards & Guidelines

### Responsive Design Philosophy
- **CRITICAL**: All components, pages, and layouts MUST be responsive by default
- **Mobile First**: Design and implement for mobile devices first, then enhance for larger screens
- **Breakpoints**: Use Tailwind's responsive utilities (sm:, md:, lg:, xl:, 2xl:) consistently

### File Organization
- Use existing component patterns and structures as templates
- Follow the established folder structure strictly
- **Layout Components**: Create reusable layout components in `src/components/` rather than in app routes. Use `layout.tsx` files only for Next.js App Router layouts
- **Component Organization**: In `src/components/`, organize components into categorized folders with preferably one depth, maximum two levels allowed (e.g., `src/components/forms/`, `src/components/navigation/`)

### Component Development
- **UI Components**: Use Shadcn/UI patterns in `src/components/ui/`
- **UI Component Restrictions**: NEVER edit files in `src/components/ui/` unless explicitly asked to modify them
- **Theming**: Always rely on Shadcn/UI theming system for consistent styling
- **Toasts**: Use Sonner for toast notifications with Shadcn/UI
- **Button Loading States**: Always use spinners for buttons with loading states
- **Component Styling**: Use Tailwind CSS v4 with class-variance-authority (cva)
- **Component Props**: Use TypeScript interfaces with proper typing
- **Accessibility**: Follow Radix UI accessibility patterns
- **Responsive Design**: MANDATORY - Use Tailwind responsive utilities for all layout, typography, and spacing
- **CRITICAL - Card Padding**: NEVER add padding inside Shadcn/UI Card components (Card, CardContent, CardHeader, CardFooter) as they already include proper padding. Especially avoid vertical padding (pt-*, pb-*, py-*) within card content areas.

### Code Patterns
- **Imports**: Use `@/*` path aliases consistently
- **Styling**: Use `cn()` utility from `@/libs/utils` for class merging
- **Forms**: Use React Hook Form with Zod validation
- **State Management**: Prefer server components, use React Context sparingly
- **Error Handling**: Follow established error boundary patterns
- **Data Fetching**: Use Next.js server components and server actions
- **CRITICAL - Server Actions vs API Routes**: ALWAYS prefer server actions over API routes for server-side logic. Server actions provide better type safety, simpler error handling, and better integration with React forms. Only use API routes for external API integration, webhooks, or when you specifically need REST endpoints for third-party consumption. Server actions should be placed in `src/functions/` directory.

### TypeScript Standards
- **Types**: Use auto-generated Payload types from `src/types/payload-types.ts`
- **Interfaces**: Define component props and API responses
- **Strict Mode**: Follow ESLint rules in `eslint.config.mjs`
- **Naming**: Use PascalCase for components, camelCase for functions/variables

### Payload CMS Patterns
- **Collections**: Follow Users collection pattern in `src/backend/collections/`
- **Email Templates**: Use React Email with Payload's email system
- **Relationships**: When creating or updating documents with relationship fields, use only the ID of the related document, not the full object

### Internationalization
- **Messages**: Add translations to `src/locales/messages/` for both `en.json` and `nl.json`
- **Routing**: Use `next-intl` patterns for localized routes
- **Components**: Use `useTranslations` hook for client components

### Security Best Practices
- **Authentication**: Use Payload's built-in auth system
- **Authorization**: Implement proper access control in collections
- **Environment Variables**: Never commit secrets, use `.env.example`
- **Input Validation**: Always validate with Zod schemas

### Performance Guidelines
- **Server Components**: Use by default, client components only when needed
- **Image Optimization**: Use Next.js Image component with proper sizing and responsive breakpoints
- **Responsive Images**: Always implement responsive images with appropriate sizes for different screen dimensions

### Documentation Standards
- **NEVER** create documentation files unless explicitly requested
- **NEVER** create README files proactively
- **Comments**: Add only when complex logic requires explanation

## Environment & Configuration

### Development Setup
1. Install dependencies: `npm install`
2. Set up environment variables in `.env.example`
4. Generate types: `npm run generate:types`

## Troubleshooting

### Common Issues
- **Type Errors**: Run `npm run generate:types` after schema changes
- **Build Failures**: Check ESLint errors with `npm run lint`
