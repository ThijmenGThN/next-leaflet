
# next-leaflet

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

<b>Looking for the [(directus)](https://github.com/ThijmenGThN/next-directus) branch?</b>

![preview](https://i.imgur.com/phUOmgo.png)

# Getting started

## Dependencies

- NodeJS [(link)](https://nodejs.org) ` >16.8 `
- Docker [(link)](https://docker.com/get-started/) ` >24 `
- Docker Compose [(link)](https://docs.docker.com/compose/install) ` >1.28 `


## Setup

1. Clone the repository to your system. 
```sh
git clone https://github.com/ThijmenGThN/next-leaflet
```
```sh
cd next-leaflet
```

2. Preparing the environment, it is recommend to use the sample file.
```sh
cp sample.env .env
```
```sh
nano .env
```

3. Install the required dependencies, by default we do this with yarn.
```
yarn install
```
> <b>Don't have yarn installed? </b><br/>
> You can install it via npm.
> ```sh
> npm i -g yarn
> ```

## Development

1. Running Next.js in devmode.
```sh
yarn dev
```

2. Starting the database.
```sh
docker-compose up -d
```
> <b>A fresh installation needs an additional step.</b><br/>
> Apply prisma's schema to the database.
> ```sh
> npx prisma db push
> ```

## Deployment

To deploy next-leaflet we use docker by default, if you'd like to do it without docker, follow the <b>Development</b> procedure whilst changing step 1 to ` yarn deploy `.

> <b>Set the right variables.</b><br />
> Ensure that ` COMPOSE_PROFILES ` has been set to ` prod ` in the environment file so docker knows to also deploy the ` app ` service alongside the ` database `.

0. Pull down any existing services that might run in the background.
```sh
docker-compose down
```

1. Start next-leaflet in deployment-mode.
```sh
docker-compose up -d
```

> <b>next-leaflet should (after a while) go up on port ` 3000 `.</b><br />
> Display the console logs if the service is not going online. Do take note that the port might differ if adjusted in the environment file.
> ```sh
> docker-compose logs
> ```
