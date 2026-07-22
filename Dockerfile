# PWA builder - React + Vite + shadcn/ui + recharts.
# Outputs static files to /dist, served by the `web` (nginx) container at /app/.

FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM alpine:3.20
COPY --from=build /app/dist /dist
