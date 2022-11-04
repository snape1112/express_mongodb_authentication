FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm rebuild bcrypt 

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "watch" ]
