From node:alpine


COPY . /docker

WORKDIR /docker

RUN npm install

EXPOSE 3001

RUN npm install nodemon --save-dev

CMD ["npm", "start"]