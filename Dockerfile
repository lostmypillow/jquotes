FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN corepack enable
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN pnpm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3002
RUN chown -R node /usr/src/app
USER node
CMD ["pnpm", "prod"]
