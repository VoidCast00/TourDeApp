FROM oven/bun:1.4.2
WORKDIR /backend
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY tsconfig.json ./
COPY shared ./shared
COPY server ./server
CMD ["bun", "run", "server/index.ts"]