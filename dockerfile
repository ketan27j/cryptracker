# Use the official Node.js image as the base image
FROM node:20

# prisma-shared setup
WORKDIR /app
RUN mkdir prisma-shared
# Set the working directory
WORKDIR /app/prisma-shared
# Copy package.json and package-lock.json
COPY prisma-shared/package*.json /app/prisma-shared/
COPY prisma-shared /app/prisma-shared/
RUN npm install
RUN npm run build

# backend setup
WORKDIR /app
COPY backend/package*.json ./
# Copy the rest of the application code
COPY backend ./
# Install dependencies & build
RUN npm install
RUN npm run build

# client setup
WORKDIR /app
RUN mkdir client
WORKDIR /app/client
COPY cryptracker-web/package*.json /app/client
COPY cryptracker-web /app/client/
RUN npm install
RUN npm run build


WORKDIR /app
# Start the application
CMD ["npm", "start"]
