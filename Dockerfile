FROM node:14-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD yarn start:prod