FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
#COPY package.json /usr/src/app/package.json
#RUN npm install \
#   && mv /usr/src/app/node_modules /node_modules
COPY . /usr/src/app

ENV PORT 80
EXPOSE 80 3000

# CMD ["node", "server.js"]