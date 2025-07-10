# --------- Stage 1: Build Frontend ---------
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# --------- Stage 2: Build Backend ---------
FROM node:20 AS backend-build
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci
COPY backend ./backend

# --------- Stage 3: Production Image ---------
FROM node:20-slim
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# This puts the built frontend at /app/frontend/dist in the image, which matches what your backend expect
# Copy built frontend to backend's static folder
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Install backend dependencies (again, for production)
RUN cd backend && npm ci --omit=dev

# Expose port (default 9000)
EXPOSE 9000

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production

# Start the backend (which serves the frontend)
CMD ["node", "backend/index.js"] 