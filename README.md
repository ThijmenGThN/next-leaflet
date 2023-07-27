
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

3. Install the required dependencies, yarn is recommend but you can also use npm.
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
