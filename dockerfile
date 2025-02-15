FROM node:latest

WORKDIR /war_house_front

COPY package*.json ./

COPY . .

EXPOSE 5173

CMD npm install --legacy-peer-deps && npm run dev
