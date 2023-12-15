FROM node:15-alpine

WORKDIR /app 

COPY package*.json ./app/

RUN npm install 

RUN npm install express


COPY . . 

EXPOSE 3000 

ENTRYPOINT ["node", "index.js"]
