# Sử dụng Node.js LTS
FROM node:20

# Thư mục làm việc bên trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build NestJS
RUN npm run build

# Chạy app
CMD ["npm", "run", "start:prod"]
