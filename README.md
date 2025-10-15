# next-leaflet

![preview](https://i.imgur.com/oulW1VO.png)

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

### Powered by

- [Next.js](https://nextjs.org) - React framework with App Router
- [Convex](https://convex.dev) - Backend database and serverless functions

### Features

- **Backend**: Convex for database and server logic
- **Authentication**: Convex Auth with password and GitHub OAuth providers
- **Email**: Password reset functionality with react-email templates
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Dark Mode**: Theme switching with next-themes (synced to database)
- **Type Safety**: Full TypeScript support with auto-generated types
- **Code Quality**: Biome for linting and formatting

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Convex (database + serverless functions)
- **Auth**: @convex-dev/auth with Password and GitHub OAuth providers
- **Email**: react-email with nodemailer
- **Icons**: Lucide React
- **Linting**: Biome

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```

2. Copy the environment variables file:
	```bash
	cp .env.sample .env.local
	```

3. Start the development server:
	```bash
	npm run dev
	```

This will:
- Start both Next.js (port 3000) and Convex dev servers
- Automatically configure Convex Auth
- Open the Convex dashboard

4. The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run dev:frontend` - Start only Next.js dev server
- `npm run dev:backend` - Start only Convex dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run email` - Start react-email dev server for email templates
- `npm run lint` - Check code with Biome
- `npm run lint:fix` - Fix issues automatically
- `npm run format` - Format code with Biome

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # Public home routes
│   ├── (auth)/            # Authentication pages (login, register, reset)
│   └── dash/              # Protected dashboard routes
├── components/            # Reusable React components
│   └── ui/                # shadcn/ui components
├── emails/                # react-email templates (password reset, etc.)
├── lib/                   # Utility functions (auth errors, etc.)
├── styles/                # Global styles
└── middleware.ts          # Route protection

convex/
├── schema.ts              # Database schema with auth tables
├── auth.ts                # Convex Auth configuration (Password, GitHub)
├── auth.config.ts         # Additional auth configuration
├── email.ts               # Email sending logic (Node.js runtime)
├── users.ts               # User queries and mutations
├── http.ts                # HTTP endpoints (auth routes)
└── _generated/            # Auto-generated types

setup.mjs                  # Auto-setup script for JWT keys and environment
```

## Authentication

The app includes a complete authentication setup:

### Providers
- **Password Authentication**: Email/password with registration and login
- **GitHub OAuth**: One-click sign-in with GitHub (optional)
- **Password Reset**: Email-based password reset flow with token verification

### Features
- Protected routes with middleware-based redirects
- Server-side and client-side auth state management
- User profile management (name, email, theme preference)
- Automatic redirect callbacks after OAuth sign-in

### Routes
- `/login` - Sign in with password or GitHub (redirects to `/dash` if authenticated)
- `/register` - Create account with password or GitHub (redirects to `/dash` if authenticated)
- `/reset` - Request password reset via email
- `/dash` - Protected dashboard (requires authentication)

### Setup GitHub OAuth (Optional)

1. Create a GitHub OAuth App:
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Set **Homepage URL**: `http://localhost:3000` (or your domain)
   - Set **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

2. Add credentials to `.env.local`:
   ```bash
   AUTH_GITHUB_ID=your_github_client_id
   AUTH_GITHUB_SECRET=your_github_client_secret
   ```

3. Restart dev server - GitHub sign-in will appear automatically

## Email Configuration (Optional)

The app supports sending password reset emails via SMTP. To enable:

1. Add SMTP configuration to `.env.local`:
   ```bash
   SMTP_HOST=mail.provider.com
   SMTP_PORT=587
   SMTP_USER=your_username
   SMTP_PASS=your_password
   MAIL_DEFAULT_NAME="Your App Name"
   MAIL_DEFAULT_ADDRESS="noreply@yourdomain.com"
   ```

2. Restart dev server - credentials will sync to Convex automatically

3. Email templates are in `src/emails/` and use react-email:
   ```bash
   npm run email  # Preview and edit email templates
   ```

**Note**: Without SMTP configured, password reset emails won't be sent, but all other features work normally.

## Common Workflows

<details>
<summary>Adding a New UI Component</summary>

This project uses shadcn/ui components. To add a new component:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

Components will be added to `src/components/ui/` and are fully customizable.

</details>

<details>
<summary>Creating Convex Functions</summary>

1. Create a new file in the `convex/` directory (e.g., `convex/tasks.ts`)
2. Define your queries, mutations, or actions:

```typescript
import { v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const list = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("tasks").collect()
	},
})

export const create = mutation({
	args: { text: v.string() },
	handler: async (ctx, args) => {
		await ctx.db.insert("tasks", { text: args.text })
	},
})
```

3. Import and use in your components:

```typescript
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const tasks = useQuery(api.tasks.list)
const createTask = useMutation(api.tasks.create)
```

</details>

<details>
<summary>Protecting Routes</summary>

Routes are protected via middleware in `src/middleware.ts`. To add authentication to a new route:

1. Add the route pattern to the middleware matcher
2. Or place the route under the `/dash` directory for automatic protection

</details>

<details>
<summary>Customizing Themes</summary>

Themes are configured in `src/styles/globals.css`. Modify CSS variables to customize colors:

```css
@layer base {
	:root {
		--background: 0 0% 100%;
		--foreground: 222.2 84% 4.9%;
		/* ... customize other colors */
	}
}
```

</details>

## Production Deployment

<details>
<summary>Using Vercel (Recommended)</summary>

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `CONVEX_DEPLOYMENT` environment variable (from Convex dashboard)
4. Deploy

</details>

<details>
<summary>Convex Setup for Production</summary>

1. Run `npx convex deploy` to create a production deployment
2. Copy the production deployment URL to your hosting platform's environment variables
3. Configure authentication secrets in the Convex dashboard

</details>

## Environment Variables

<details>
<summary>View all environment variables</summary>

### Required
- `NEXT_PUBLIC_DOMAIN` - Your app URL (defaults to `http://localhost:3000`)
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL (auto-configured during dev)
- `CONVEX_DEPLOYMENT` - Convex deployment name (see `.env.sample`)

### Optional - GitHub OAuth
- `AUTH_GITHUB_ID` - GitHub OAuth App client ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth App client secret

### Optional - Email (SMTP)
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (default: 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `MAIL_DEFAULT_NAME` - Sender name for emails
- `MAIL_DEFAULT_ADDRESS` - Sender email address

### Auto-generated (don't modify)
- `JWT_PRIVATE_KEY` - Auto-generated JWT signing key
- `JWKS` - Auto-generated public key set

**Note**: The `setup.mjs` script automatically syncs relevant variables from `.env.local` to Convex on first run.

</details>

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth Documentation](https://labs.convex.dev/auth)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
