# Streaming Platform

Full-stack streaming platform with microservices architecture.


Project Structure
-----------------

streaming-platform/
├── server/         NestJS backend
├── client/         Next.js frontend
└── mobile/         React Native app


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
  - SCSS + CSS Variables

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


Docker
------

docker-compose up --build


Features
--------

- User authentication (JWT + OAuth2)
- Video upload and streaming
- Playlists management
- Subscription system
- AI recommendations
- View history
- Real-time chat (WebSockets)
- Real-time analytics
- Payment integration
- Mobile support


License
-------

MIT