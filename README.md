# next-leaflet

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

### Powered by

- [Next.js](https://nextjs.org) - React framework with App Router
- [Convex](https://convex.dev) - Backend database and serverless functions

### Features

- **Backend**: Convex for database and server logic
- **Authentication**: Convex Auth with password provider
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Dark Mode**: Theme switching with next-themes
- **Type Safety**: Full TypeScript support with auto-generated types
- **Code Quality**: Biome for linting and formatting

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Convex (database + serverless functions)
- **Auth**: @convex-dev/auth with Password provider
- **Icons**: Lucide React
- **Linting**: Biome

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```

2. Start the development server:
	```bash
	npm run dev
	```

This will:
- Start both Next.js (port 3000) and Convex dev servers
- Automatically configure Convex Auth
- Open the Convex dashboard

3. The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run dev:frontend` - Start only Next.js dev server
- `npm run dev:backend` - Start only Convex dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check code with Biome
- `npm run lint:fix` - Fix issues automatically
- `npm run format` - Format code with Biome

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # Public home routes
│   ├── (auth)/            # Authentication pages
│   └── dash/              # Protected dashboard routes
├── components/            # Reusable React components
│   └── ui/                # shadcn/ui components
├── styles/                # Global styles
└── middleware.ts          # Route protection

convex/
├── schema.ts              # Database schema
├── auth.ts                # Convex Auth configuration
├── http.ts                # HTTP endpoints
└── _generated/            # Auto-generated types
```

## Authentication

The app includes a complete authentication setup:
- Password-based authentication via Convex Auth
- Protected routes (middleware redirects)
- Server-side and client-side auth state
- User management with profile fields

Routes:
- `/login` and `/register` - Auth pages (redirect to `/dash` if authenticated)
- `/dash` - Protected dashboard (requires authentication)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth Documentation](https://labs.convex.dev/auth)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## Environment Variables

Key environment variables (auto-configured during setup):

- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL

## License

MIT License - see LICENSE file for details.
