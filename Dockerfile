FROM node:8-alpine
ARG CLIENT_OR_SERVER
WORKDIR /app
COPY ["./${CLIENT_OR_SERVER}/package.json", "./${CLIENT_OR_SERVER}/package-lock.json", "./"]
RUN npm install && npm cache clean --force
COPY ["./${CLIENT_OR_SERVER}", "./"]
COPY ["./shared", "/shared/"]
RUN cd /shared && npm install && npm link && cd /app && npm link shared
CMD ["npm", "start"]
