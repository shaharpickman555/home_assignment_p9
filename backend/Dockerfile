# Use the official Node.js 14 as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run the app when the container launches
CMD ["node", "app.js"]