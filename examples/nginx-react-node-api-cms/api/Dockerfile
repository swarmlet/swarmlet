FROM node:10-alpine

ADD package.json package-lock.json ./
RUN npm install
ADD . .
RUN npm run-script build

CMD ["node", "dist/main"]

EXPOSE 8080
