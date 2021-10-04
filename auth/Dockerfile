FROM node:16-alpine3.11

LABEL marcelo-gonçalves="tchelojg@gmail.com"

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]