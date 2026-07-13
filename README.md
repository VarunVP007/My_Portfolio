# 🚀 Personal Portfolio — Varunprasad V

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-ready, highly responsive, and elegant full-stack personal portfolio website designed for **Varunprasad V** — Full Stack Developer & Computer Science and Business Systems Student. Built with a modern Warm Earthy SaaS design system, dynamic data visualization, interactive project showcases, and a Node.js + Express backend.

---

## ✨ Key Features

- **🎨 Modern Design System:** Custom Warm Earthy Palette with glassmorphism, smooth animations, and clean typography.
- **📱 Fully Responsive:** Optimized for all screen sizes (Mobile, Tablet, Desktop).
- **⚡ High Performance:** Code splitting & lazy loading via Vite and React Router DOM v6.
- **📊 Interactive Data Visualization:** Recharts integration for LeetCode problem distribution and rating charts.
- **🎓 Integrated Education & Experience:** Combined About & Education timeline with interactive modal views.
- **📄 Native PDF Resume Viewer:** Built-in PDF preview and download functionality.
- **📩 Full-Stack Contact System:** Express + MongoDB backend for storing messages with rate limiting and input validation.
- **🔍 SEO & Accessibility:** Dynamic Meta tags, OpenGraph support, and WCAG compliant contrast.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Vanilla CSS utilities
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router DOM v6

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** Helmet, CORS, Express Rate Limit

---

## 📂 Project Structure

```text
My_Portfolio/
├── frontend/                     # React + Vite Frontend
│   ├── public/
│   │   ├── assets/               # Logo and Hero image assets
│   │   └── resume/               # PDF Resume storage
│   └── src/
│       ├── animations/           # Framer Motion variants
│       ├── components/           # Navbar, Footer, Logo, SectionTitle
│       ├── data/                 # Personal info, Projects, Skills, Education
│       ├── layouts/              # MainLayout
│       ├── pages/                # Home, About, Skills, Projects, Experience, LeetCode, Contact
│       ├── routes/               # AppRouter
│       └── services/             # API services
│
└── backend/                      # Express.js REST API
    ├── config/                   # MongoDB connection config
    ├── controllers/              # Contact form controllers
    ├── models/                   # Mongoose schemas
    ├── routes/                   # API route handlers
    └── server.js                 # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (Local instance or MongoDB Atlas)

---

### 1️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
> The frontend application will be live at `http://localhost:5173`.

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```
> The REST API server will be live at `http://localhost:5000`.

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status check |
| `POST` | `/api/contact` | Submit contact form message |
| `GET` | `/api/contact` | Retrieve messages (Admin) |

---

## 👤 Author

**Varunprasad V**
- **Degree:** B.Tech Computer Science and Business Systems
- **Location:** Salem, TamilNadu
- **Email:** varunprasadofficial23@gmail.com
- **GitHub:** [@VarunVP007](https://github.com/VarunVP007)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).