FROM node:alpine
WORKDIR /src/app/ludo
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]