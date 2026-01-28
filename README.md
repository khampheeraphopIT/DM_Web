# 🌿 CaneScan Web - ระบบวินิจฉัยโรคใบอ้อยด้วย AI

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-orange?style=for-the-badge" alt="License" />
</p>

**Frontend เว็บแอปสำหรับวินิจฉัยโรคใบอ้อยด้วย AI** - ถ่ายภาพหรืออัพโหลดรูปใบอ้อย แล้วรับผลวินิจฉัยทันที!

---

## ✨ Features

- 📷 **ถ่ายภาพ/อัพโหลด** - รองรับ Camera และ File Upload
- 🤖 **AI วิเคราะห์ทันที** - ผลลัพธ์ภายในไม่กี่วินาที
- 📊 **ผลวินิจฉัยละเอียด** - ความมั่นใจ, อาการ, วิธีรักษา
- 📱 **Responsive Design** - ใช้งานได้ทั้ง Mobile และ Desktop
- 🔐 **ระบบ Login** - บันทึกประวัติการสแกน
- 📜 **ประวัติการสแกน** - ดูผลลัพธ์ย้อนหลัง

---

## 🖼️ Screenshots

| หน้าหลัก | สแกนโรค | ผลวินิจฉัย |
|----------|---------|------------|
| Hero Section | Camera/Upload | Disease Results |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ หรือ Bun
- Backend API running ([CaneScanDM_BE](https://github.com/yourusername/CaneScanDM_BE))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/DM_Web.git
cd DM_Web

# ติดตั้ง dependencies
npm install
# หรือ
bun install
```

### Configuration

แก้ไข API URL ใน `src/services/api.ts`:
```typescript
const API_BASE = "http://localhost:8000/api";
```

### Run Development Server

```bash
npm run dev
# หรือ
bun dev
```

🎉 เปิด http://localhost:5173

---

## 📁 Project Structure

```
DM_Web/
├── src/
│   ├── components/
│   │   ├── HomePage/           # หน้าหลัก components
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Scanner.tsx
│   │   │   ├── ResultDisplay.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   └── index.tsx
│   │   ├── icons/              # SVG Icons
│   │   │   ├── LeafIcon.tsx
│   │   │   ├── CameraIcon.tsx
│   │   │   └── index.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Card.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication state
│   ├── hooks/
│   │   └── useDisease.ts       # React Query hooks
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── HistoryPage.tsx
│   ├── routes/
│   │   └── index.tsx           # App routes
│   ├── services/
│   │   └── api.ts              # API calls
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Component Architecture

```
App
└── AuthProvider
    └── BrowserRouter
        └── AppRoutes
            ├── HomePage
            │   ├── Header
            │   ├── HeroSection
            │   │   └── FeatureCard[]
            │   ├── Scanner
            │   └── ResultDisplay
            ├── LoginPage
            └── HistoryPage
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript 5 | Type Safety |
| Vite 7 | Build Tool |
| TanStack Query | Data Fetching |
| React Router 6 | Routing |
| Inline CSS | Styling |

---

## 📱 API Integration

```typescript
// src/services/api.ts
const response = await apiService.predictDisease(imageFile);

// Response Types
interface ApiResponse {
  success: boolean;
  data?: PredictionResult;
  error?: string;
  error_type?: "rate_limit" | "quota_exceeded" | "unknown";
  retry_after?: number;
  message?: string;
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📝 Environment Variables

สร้างไฟล์ `.env.local` (optional):
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🧪 Testing

```bash
npm run lint      # ESLint
npm run build     # Type check + Build
```

---

## 📝 License

MIT License - ใช้งานได้อิสระ

---

## 👥 Contributors

- Your Name (@yourusername)

---

<p align="center">
  Made with 💚 for Thai Sugarcane Farmers
</p>
