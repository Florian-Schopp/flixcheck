# Dockerfile

# Base image for the front-end
FROM node:20 as frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# # Base image for the back-end
FROM node:20 as backend
WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build
RUN npm run doc

# # Final image
FROM node:20
RUN apt-get update && apt-get install -y lighttpd

# # Set the working directory
WORKDIR /app

# # Copy the built front-end code from the frontend stage
COPY --from=frontend /frontend/build /var/www/html/

# # Copy the back-end code from the backend stage
COPY --from=backend /backend/dist ./backend
COPY --from=backend /backend/doc /var/www/html/docs/

# # Expose the port for the front-end
EXPOSE 80
EXPOSE 4000


# Configure lighttpd
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY start.sh /app/start.sh

ENTRYPOINT ["sh","start.sh"]
