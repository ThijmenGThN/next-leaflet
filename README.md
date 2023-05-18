### An optimized tech stack for efficiency.

> Here's a quick rundown of what's inside.
>
> **NextJS** offers a fast and seamless user experience, while **Directus** provides an easy-to-use admin dashboard for efficient database management. 
>
> By integrating **Tailwind CSS** into **NextJS**, we eliminate the need for constant file switching and ensure streamlined styling. 
>
> Many Quality-of-Life features have been implemented as well, this includes **Module path aliases** and the ability to use your own themes with **Tailwind**.
> 
> This results in a more efficient and beginner-friendly development environment.

### What's inside?
- [NextJS](https://nextjs.org)
- [Directus](https://directus.io)
- [Tailwind](https://tailwindcss.com)

## Getting Started

### Production
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
    - *Promptly note that by default the project will run in development mode, which means that it will only host the backend **Directus** and the corresponding database.*

5. ` Requires step 4 ` Deploying next-leaflet with **Docker** <br /> 
```
docker-compose up
```
</details>

### Development
<details>
    <summary>How to: Start building your app.</summary>

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
    - *Promptly note that by default the project will run in development mode, which means that it will only host the backend **Directus** and the corresponding database.*

5. ` Requires step 4 ` Deploying next-leaflet with **Docker** <br /> 
```
docker-compose up
```

6. Installing dependencies for the front-end <br />
```
yarn install
```

7. Running next.js to view the front-end <br />
```
yarn dev
```
</details>

![Preview](https://i.imgur.com/LJDkCeD.png)