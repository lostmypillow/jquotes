
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
RUN corepack enable
RUN mkdir /app
FROM base AS prod

COPY pnpm-lock.yaml /app
WORKDIR /app
RUN pnpm fetch --prod

COPY . /app

FROM base
COPY --from=prod /app/node_modules /app/node_modules

EXPOSE 3002
CMD [ "pnpm", "prod" ]