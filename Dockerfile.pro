FROM node:18-alpine
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

EXPOSE 3000
# dong nay de chay server.js thay vi dung npm start, vi trong standalone da co server.js roi
CMD ["node", "server.js"]

# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install
 
# COPY . .
# RUN npm run build

# # ---- runtime ----
# FROM node:18-alpine

# WORKDIR /app

# COPY --from=builder /app ./

# CMD ["npm", "start"]