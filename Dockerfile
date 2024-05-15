FROM node:lts-slim AS base

WORKDIR /usr/src

FROM base AS runner

COPY package.json ./

RUN npm i --omit=dev

COPY . .

EXPOSE 80
CMD ["npm", "run", "start"]