FROM  node:14
RUN mkdir /main
WORKDIR /main

COPY package*.json ./

RUN npm install && npm i prisma -g

ADD . .

RUN  prisma generate

EXPOSE 3000


CMD ["npm","start"]
