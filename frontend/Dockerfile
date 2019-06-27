FROM node:11.3

RUN npm install -g serve

# set workdir
WORKDIR /usr/src

# copy frontend package.json
COPY package.json /usr/src

# copy build
COPY build /usr/src/build

CMD ["npm", "run", "serve"]
