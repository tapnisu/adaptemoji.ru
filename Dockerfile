FROM node:20-alpine3.20 AS build
LABEL authors="tapnisu"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY . /app
WORKDIR /app

RUN corepack enable
RUN corepack install

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.27-alpine AS runner

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
