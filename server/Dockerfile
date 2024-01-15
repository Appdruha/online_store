FROM node:20
RUN npm install pm2 -g
USER root
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 8080
CMD ["pm2-runtime", "index.js"]