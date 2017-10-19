FROM node:8-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "start"]
