### STAGE 1: Build ###
FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.22.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/prf-project_frontend /usr/share/nginx/html