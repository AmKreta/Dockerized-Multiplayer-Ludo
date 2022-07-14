FROM node:alpine
WORKDIR /src/app/authserver
RUN npm install -g nodemon
COPY package.json .
RUN npm install --save
COPY . .
EXPOSE 8080
CMD ["npm","start"]