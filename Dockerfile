FROM alekzonder/puppeteer:latest

COPY ./package* ./

RUN npm i

COPY . .

CMD ["npm", "start"]

EXPOSE 3000