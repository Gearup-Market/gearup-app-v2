# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install Python, make, and g++ (part of build-essential)
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Stage 2: Development Environment
FROM node:18-alpine AS development-build-stage

# Set working directory
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app /app

# Install additional global packages needed for development
RUN npm install -g nodemon

# Expose the port that the app runs on
EXPOSE 3000

# Set environment variable to development
ENV NODE_ENV=development

# Run the application using nodemon
CMD ["npm", "run", "dev"]
