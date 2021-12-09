# Start with the Node.js 14 image
FROM node:14

# Set a working directory
WORKDIR /app

# Copy the project file
COPY package*.json ./

# Install ALL node_modules, including 'devDependencies'
RUN npm install

# Copy the entire project
COPY . .

# set default environment variables
ENV MONGO_SERVICE_URI ""
ENV MONGO_SERVICE_HOST mongo
ENV MONGO_SERVICE_PORT 27017
ENV MONGO_DB app

EXPOSE 8080

# Specify the command for running the service
CMD node ./bin/main.js