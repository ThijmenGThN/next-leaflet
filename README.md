### An optimized tech stack for efficiency.

> This tech stack provides a convenient template that streamlines the overall development process. To ensure efficient workflow, we have incorporated a few useful features. You can find more information on what is included and how to utilize next-leaflet below. We welcome your contributions and ideas to make this even better.

### What's inside?
- [NextJS](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [Tailwind](https://tailwindcss.com)

## Getting Started

### ━ Production: Deploy with Docker
<details>
    <summary>How to: deploy the stack.</summary>

0. System requirements <br />
    - [Node.js](https://nodejs.org) ` LTS `
    - [Docker](https://docker.com)
    - [Docker Compose](https://docs.docker.com/compose/install) ` 1.28.0 ` or ` newer `

1. Clone our repository to your device <br /> 
```
git clone https://github.com/ThijmenGThN/next-leaflet
```

2. Navigate to the freshly cloned directory <br /> 
```
cd next-leaflet
```

3. Create your own dotenv file, it is recommended to use ` sample.env ` as a template <br /> 
```
cp sample.env .env
```

4. Open the .env file with your desired editor and adjust the variables to your needs <br /> 
    - *Promptly note that by default the project will run in development mode, which means that it will only host the database.*

5.
```
docker-compose up
```
</details>

### ━ Development: Run it locally
<details>
    <summary>How to: Start constructing your app.</summary>

0. System requirements <br />
    - [Node.js](https://nodejs.org) ` LTS `
    - [Docker](https://docker.com)
    - [Docker Compose](https://docs.docker.com/compose/install) ` 1.28.0 ` or ` newer `

1. Clone our repository to your device <br /> 
```
git clone https://github.com/ThijmenGThN/next-leaflet
```

2. Navigate to the freshly cloned directory <br /> 
```
cd next-leaflet
```

3. Create your own dotenv file, it is recommended to use ` sample.env ` as a template <br /> 
```
cp sample.env .env
```

4. Open the .env file with your desired editor and adjust the variables to your needs <br /> 
    - *Promptly note that by default the project will run in development mode, which means that it will only host the database.*

5. Deploying the database with **Docker** <br /> 
```
docker-compose up
```

6. Installing dependencies for next.js <br />
```
yarn install
```

7. Running next.js in development mode <br />
```
yarn dev
```
</details>

![Preview](https://i.imgur.com/LJDkCeD.png)