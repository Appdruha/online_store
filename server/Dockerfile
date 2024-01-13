FROM node:20
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --omit=dev
COPY . /app
EXPOSE 8080
USER node
CMD ["node", "index.js"]