FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "pnpm-lock.yaml*", "./"]
RUN corepack enable
RUN pnpm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3002
RUN chown -R node /usr/src/app
USER node
CMD ["node", "app.js"]
