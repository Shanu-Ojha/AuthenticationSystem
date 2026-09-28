# 🔐 Authentication System

A full-stack authentication system built with **React, Node.js, Express, MongoDB and JWT**.

The project implements secure user authentication using **short-lived Access Tokens** and **long-lived Refresh Tokens**, along with protected routes and automatic access-token renewal.

## 🚀 Live Demo

🌐 **Frontend:** https://authentication-system-nu-beige.vercel.app/

🔗 **Backend:** https://authenticationsystem-yeui.onrender.com/

---

## ✨ Features

- 🔐 User Registration
- 🔑 User Login
- 🛡️ Protected Profile Route
- 🎟️ JWT Access Token Authentication
- ♻️ Refresh Token Authentication
- 🔄 Automatic Access Token Refresh
- 🍪 HTTP-only Refresh Token Cookie
- 🔒 Password Hashing with bcrypt
- 🗄️ MongoDB Database
- ⚡ React + Vite Frontend
- 🌐 Express REST API
- 🚀 Vercel + Render Deployment

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT
- bcrypt
- cookie-parser

### Database
- MongoDB
- Mongoose

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

# 🔐 How Authentication Works

This project uses **two JWT tokens**:

### 1. Access Token

The Access Token is used to authenticate API requests.

It has a **short lifetime** to reduce the impact if the token is compromised.

For example:

```text
Access Token
    ↓
Used for protected API requests
    ↓
Expires after a short period
