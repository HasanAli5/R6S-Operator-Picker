FROM node:22
WORKDIR /docker

COPY . .

RUN npm install

EXPOSE 80 443

CMD ["node", "index.js"]