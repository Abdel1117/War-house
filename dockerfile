FROM node:18

WORKDIR /war_house_front

# On copie d'abord les deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Puis le reste du code
COPY . .

# Expose le port utilisé (même en prod preview)
EXPOSE 5173

# On reçoit la variable ENV depuis docker-compose
ARG ENV
ENV ENV=$ENV

# Build conditionnel
RUN if [ "$ENV" = "prod" ]; then \
    npm run build; \
    fi

# Commande à l'exécution (runtime)
CMD if [ "$ENV" = "prod" ]; then \
    npm install -g serve && serve -s dist -l 5173; \
    else \
    npm run dev; \
    fi
