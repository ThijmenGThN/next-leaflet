# next-leaflet

![preview](https://i.imgur.com/oulW1VO.png)

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

### Powered by

- [NextJS](https://nextjs.org) - React framework with App Router
- [Payload CMS](https://payloadcms.com) - Headless CMS with built-in authentication

### Features

- **Database**: PostgreSQL with Payload CMS integration
- **Authentication**: Built-in user management with roles (admin/user)
- **Email**: Nodemailer integration for transactional emails
- **Internationalization**: Multi-language support with next-intl (English/Dutch)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support with auto-generated types

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Backend**: Payload CMS with PostgreSQL
- **Email**: React Email with custom templates
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Deployment**: Docker with production-ready configuration

## Getting Started

1. Copy the environment configuration:
    ```bash
    cp .env.example .env
    ```

2. Update the `.env` file with your configuration (database credentials, secrets, etc.)

3. Start the development database:
    ```bash
    docker compose up -d
    ```

4. Install dependencies:
    ```bash
    npm install
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Create your first admin user by visiting `/admin` in your browser.

## Template Synchronization

When you create your project from [next-leaflet](https://github.com/ThijmenGThN/next-leaflet), you can easily sync with the latest template updates using:

```bash
npm run sync-template
```

That's it! The command will automatically:

1. **Check for uncommitted changes** - Warns you if you have unsaved work
2. **Fetch latest template changes** - Downloads new commits from the template repo
3. **Show what's new** - Displays what's changed since your last sync
4. **Merge changes** - Automatically integrates template updates into your project

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run sync-template` - Sync with template repository updates
- `npm run generate:types` - Generate TypeScript types from Payload config
- `npm run lint` - Run ESLint
- `npm run email` - Start email development server

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── (payload)/         # Payload CMS admin
├── backend/               # Payload CMS configuration
│   ├── collections/       # Content collections
│   └── migrations/        # Database migrations
├── components/            # Reusable React components
├── emails/                # Email templates
├── functions/             # Server actions and utilities
├── locales/               # Internationalization
└── types/                 # TypeScript type definitions
```

## Internationalization

The project has internationalization out of the box:
- English (default)
- Dutch (Optional)
- ...

Add new languages by updating the `locales` array in `src/locales/routing.ts` and creating corresponding message files.

## Production Deployment

<details>
<summary>Using Docker (Recommended)</summary>

1. Update your `.env` file for production:
    ```bash
    COMPOSE_PROFILES=prod
    ```

2. Build and start the production stack:
    ```bash
    docker compose up -d --build
    ```

</details>

<details>
<summary>Manual Deployment</summary>

1. Build the application:
    ```bash
    npm run build
    ```

2. Start the production server:
    ```bash
    npm start
    ```

</details>

## Deployment Setup

<details>
<summary>Click to expand deployment setup instructions</summary>

To enable automatic deployment via GitHub Actions:

### 1. Configure Self-Hosted Runner (Optional)

If using a self-hosted runner for deployment:

1. Go to your repository Settings → Actions → Runners
2. Click "New self-hosted runner" and follow the setup instructions for your server
3. Install Docker and Docker Compose on your server

### 2. Set Up Repository Secrets

Go to your repository Settings → Secrets and variables → Actions, and add these secrets:

#### Required Secrets:
- `SSH_KEY`: Your private SSH key for server access
  ```bash
  # Generate a new SSH key pair (if needed)
  ssh-keygen -t ed25519 -C "github-deploy"
  # Copy the private key content
  cat ~/.ssh/id_ed25519
  ```

#### Optional SSH Secrets (with defaults):
- `SSH_HOST`: SSH hostname or IP (defaults to 'localhost')
- `SSH_PORT`: SSH port number (defaults to '22')
- `SSH_USER`: SSH username (defaults to 'root')

#### Application Configuration:
- `APP_ENV`: Your complete production `.env` file content (must include `NEXT_PUBLIC_DOMAIN`)
  ```
  PAYLOAD_SECRET=your-secret-here
  NEXT_PUBLIC_DOMAIN=https://your-domain.com
  DATABASE_URI=postgresql://...
  # ... other environment variables
  ```

### 3. Enable Deployment

The deployment workflow includes:
- **Lint**: Code quality checks
- **Deploy**: Build and deploy the application via SSH
- **Healthcheck**: Verify the application is responding using your domain

The workflow automatically triggers on pushes to the `main` branch.

### 4. Server Prerequisites

Your deployment server needs:
- Docker and Docker Compose installed
- SSH access configured
- Git installed
- Sufficient permissions to run Docker commands
- Network access to your domain for health checks

</details>

## Environment Variables

<details>
<summary>View environment variables</summary>

Key environment variables (see `.env.example` for full list):

- `PAYLOAD_SECRET` - Secret key for Payload CMS
- `NEXT_PUBLIC_DOMAIN` - Your domain URL
- `DATABASE_*` - PostgreSQL connection details
- `SMTP_*` - Email server configuration (optional)

</details>

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
