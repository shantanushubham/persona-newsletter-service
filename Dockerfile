FROM node:20
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT [ "npm", "start" ]