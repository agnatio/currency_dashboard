# Use the official Nginx image as base
FROM nginx:alpine

# Copy your project files to the Nginx HTML directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Nginx runs automatically when the container starts