FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start"]

EXPOSE 8000