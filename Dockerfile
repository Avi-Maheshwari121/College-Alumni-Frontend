# Stage 1: Build
# CHANGED: Upgraded from node:18-alpine to node:20-alpine to support modern Vite
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Crucial: Bake in the relative URLs for Istio routing
ENV VITE_API_URL=/api/v1
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Replace the default Nginx configuration with our SPA-friendly one
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: Copy custom nginx.conf here if you have React Router issues
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]