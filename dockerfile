FROM node:latest

WORKDIR /war_house_front

COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . .

EXPOSE 5173

ARG ENV
ENV ENV=$ENV

RUN if ["$ENV" = "prod" ]; then \ 
    npm run build; \
    else \ 
    npm run dev; \
    fi