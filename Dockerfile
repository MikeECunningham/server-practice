# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Install the project dependencies
RUN npm install

# Copy the TypeScript source code
COPY ./src ./src

# Expose the server's port
EXPOSE 8000

# Start the server
CMD npm run dev
# RUN npm run dev
