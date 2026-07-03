echo "# 🎬 Streaming Platform

Full-stack streaming platform with microservices architecture.

## 🏗️ Architecture

\`\`\`
streaming-platform/
├── server/           # NestJS microservices
├── client/           # Next.js web application
└── mobile/           # React Native mobile app
\`\`\`

## 🚀 Technologies

### Backend (Server)
- NestJS 11
- PostgreSQL + TypeORM
- Redis
- JWT Authentication
- Microservices

### Web Client
- Next.js 16
- TypeScript
- Tailwind CSS 4
- Zustand + React Query

### Mobile Client
- React Native 0.86
- Expo 57
- React Navigation

## 📦 Installation

\`\`\`bash
# Backend
cd server
npm install
cp .env.example .env
npm run start:dev

# Web Client
cd client
npm install
cp .env.local.example .env.local
npm run dev

# Mobile Client
cd mobile
npm install
npm run ios # or android
\`\`\`

## 🎯 Features

- ✅ Video upload & streaming
- ✅ Playlists management
- ✅ Subscription system
- ✅ AI recommendations
- ✅ User authentication
- ✅ View history
- ✅ Real-time analytics

## 📝 License

MIT
" > README.md