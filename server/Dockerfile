FROM node:20
RUN npm install pm2 -g
USER root
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --omit=dev
COPY . /app
EXPOSE 8080
CMD ["pm2-runtime", "index.js"]