# Use Bun image
FROM oven/bun:1.1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install

# Copy source code
COPY . .

# Build step (optional if you want to run dev mode in docker, but usually good for prod)
# RUN bun run build

# Expose port
EXPOSE 5173

# Start development server
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
