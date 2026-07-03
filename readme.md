## Streaming Platform

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
  - JWT Authentication
  - Microservices

Web Client
  - Next.js 16
  - TypeScript
  - Tailwind CSS 4
  - Zustand + React Query

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

- Video upload and streaming
- Playlists management
- Subscription system
- AI recommendations
- User authentication
- View history
- Real-time analytics


License
-------

MIT