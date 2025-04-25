
# next-leaflet

![preview](https://i.imgur.com/oulW1VO.png)

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.



### Powered by

- [NextJS](https://nextjs.org)
- [Payload](https://payloadcms.com)



### Features

- [Database](https://payloadcms.com/docs/database/overview)
- [Authentication](https://payloadcms.com/docs/access-control/overview)
- [Storage](https://payloadcms.com/docs/upload/overview)
- [Localization](https://payloadcms.com/docs/configuration/localization#locales)



### Includes

- [Tailwind](https://tailwindcss.com)
- [Gravatar](https://gravatar.com)
- [Heroicons](https://heroicons.com)
- [HeadlessUI](https://headlessui.com)



> Everything from this point on has been copied from branch "pocketbase" and has to be reworked !

## Getting Started

1. Clone the env sample file:
    ```bash
    cp .env.sample .env
    ```

2. Start the Docker services (includes postgres):
    ```bash
    docker-compose up -d
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Once the server is running, you'll need to create an admin user by visiting `/admin` in your browser.

### Production Deployment

To deploy in production mode:

1. Stop any running containers:
    ```bash
    docker compose down
    ```

2. Set the production profile in your environment:
    ```bash
    export COMPOSE_PROFILES=prod
    ```

3. Start the production stack:
    ```bash
    docker compose up -d
    ```

The server might take a moment to initialize. You can monitor the startup process with:
```bash
docker compose logs -tf
```