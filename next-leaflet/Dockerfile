FROM node:lts-alpine

WORKDIR /usr/app
COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]