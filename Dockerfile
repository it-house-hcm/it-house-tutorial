FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:14-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/config ./config

EXPOSE 4000

CMD ["npm", "start"]