FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install --omit=dev
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/sites-enabled/default
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



