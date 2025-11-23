# URL Shortener (Bitly Clone)

A full-stack URL Shortener application with analytics, built using:

- **Node.js + Express** (Backend)
- **MongoDB Atlas + Mongoose** (Database)
- **JWT Authentication**
- **React + Vite + Tailwind CSS** (Frontend)

Users can register, log in, shorten long URLs, copy them instantly, view click counts, and delete links from a dashboard.

---

## 🚀 Features

- User authentication (JWT-based)
- Shorten long URLs into shareable short codes
- Redirect and click tracking
- Copy short link with one click
- Dashboard to manage all links
- Delete unwanted links
- Fully protected routes (frontend + backend)
- Mobile responsive UI

---

## 📁 Project Structure

project-root/
│── backend/ # Node.js + Express + MongoDB API
│── frontend/ # React + Vite + Tailwind client
└── README.md

## ⚙️ Backend Setup (Node.js + Express)

cd backend
npm install
Create a **.env** file:
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=4000
Run server

## 🎨 Frontend Setup (React + Vite + Tailwind)

cd frontend
npm install
Run frontend:


---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

**Backend**
- Node.js
- Express.js
- Mongoose
- JWT Authentication
- bcrypt
- CORS

---

## 🌍 Deployment Overview

**Backend:** Render / Railway  
**Frontend:** Render/ Vercel / Netlify  
**Database:** MongoDB Atlas

---

## 📌 Scripts

### Backend
