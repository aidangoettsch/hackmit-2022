FROM node:slim
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
