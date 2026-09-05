# Streaming Platform

Full-stack streaming platform with microservices architecture.


Project Structure
-----------------

streaming-platform/
├── server/         NestJS backend
├── client/         Next.js frontend
├── mobile/         React Native app
└── k&b/            MiniKube DevOps


Technology Stack
----------------

Backend (Server)
  - NestJS 11
  - PostgreSQL + TypeORM
  - Redis
  - RabbitMQ / Kafka
  - JWT + OAuth2
  - Docker
  - Docker-compose
  - Kubernetes
  - AWS S3
  - Grafana + Prometheus

Web Client
  - Next.js 16
  - TypeScript
  - Zustand + React Query
  - Zod
  - SCSS

Mobile Client
  - React Native 0.86
  - Expo 57
  - React Navigation


Installation
------------

Backend
  cd server
  npm install
  cp .env.example .env
  npm run start:dev

Web Client
  cd client
  npm install
  cp .env.local.example .env.local
  npm run dev

Mobile Client
  cd mobile
  npm install
  npm run ios

Features
--------

- User authentication (JWT + OAuth2)


License
-------

MIT