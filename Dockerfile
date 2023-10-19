# syntax=docker/dockerfile:1

# Sử dụng image node phiên bản 20.8.0
FROM node:20 AS builder

WORKDIR /app

ENV NODE_ENV=production


COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --save-dev @types/node
RUN npm install -g webpack webpack-node-externals
RUN npm install @nestjs/cli -g
RUN npm install webpack-node-externals 

RUN npm install

COPY . .

FROM node:20

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
