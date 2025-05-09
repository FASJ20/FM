FROM node:16.14.2-slim

WORKDIR /app
COPY . /app/
RUN npm install
RUN npm update
RUN npm uninstall bcrypt
RUN npm install bcrypt
EXPOSE 4100

CMD [ "npm", "start" ]
