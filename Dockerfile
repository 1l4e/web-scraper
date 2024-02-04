FROM node:lts-alpine as  build
WORKDIR /app
COPY package*.json ./
RUN yarn 
COPY . .
RUN yarn build

FROM node:lts-alpine as production

COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .

RUN yarn --production
RUN yarn cache clean

EXPOSE 3000

CMD ["node", "."]
