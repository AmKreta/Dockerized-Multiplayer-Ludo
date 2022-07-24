FROM node:alpine
WORKDIR /src/app/ludoserver
RUN npm install -g nodemon --save
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --save
COPY . .
EXPOSE 8000
CMD ["npm","start"]

