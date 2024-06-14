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
WORKDIR /app
COPY --from=frontend /frontend/build /var/www/html/
COPY --from=backend /backend/dist ./backend
COPY --from=backend /backend/doc /var/www/html/docs/

# # Expose the ports for the front-end
EXPOSE 80
EXPOSE 443


# Configure lighttpd
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
