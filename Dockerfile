# node version
FROM node:10.2.1

# new working directory
WORKDIR amphibNames

# copying dependencies and installation
COPY package*.json ./
RUN npm install --only-production

# bundle app src code
COPY . ./

# commands for server runtime
CMD npm run-script start-prod
EXPOSE 3000
