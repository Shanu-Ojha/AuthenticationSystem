# 🔐 Authentication System

A full-stack authentication system built with **React, Node.js, Express, MongoDB and JWT**.

The project implements user authentication using **short-lived Access Tokens** and **long-lived Refresh Tokens**, protected routes, HTTP-only cookies, and automatic access-token renewal.

## 🚀 Live Demo

🌐 **Frontend:** https://authentication-system-nu-beige.vercel.app/

🔗 **Backend:** https://authenticationsystem-yeui.onrender.com/

\---

## ✨ Features

* 🔐 User Registration
* 🔑 User Login
* 🛡️ Protected Profile Route
* 🎟️ JWT Access Token Authentication
* ♻️ Refresh Token Authentication
* 🔄 Automatic Access Token Refresh
* 🍪 HTTP-only Refresh Token Cookie
* 🔒 Password Hashing with bcrypt
* 🗄️ MongoDB Database
* ⚡ React + Vite Frontend
* 🌐 Express REST API
* 🚀 Vercel + Render Deployment

\---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT
* bcrypt
* cookie-parser

### Database

* MongoDB
* Mongoose

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

\---

# 🔐 Authentication Architecture

This project uses two JWT-based tokens:

* **Access Token**
* **Refresh Token**

They have different purposes and lifetimes.

## 1\. Access Token

The Access Token is used to authenticate protected API requests.

It is intentionally short-lived. When a protected endpoint is requested, the frontend sends the token using the `Authorization` header:

```http
Authorization: Bearer <access\_token>
```

The backend verifies the token before allowing access to protected resources.

The basic flow is:

```text
Access Token
     ↓
Protected API Request
     ↓
Backend verifies token
     ↓
Request allowed
```

Because the Access Token is short-lived, an expired token will eventually result in a `401 Unauthorized` response.

\---

## 2\. Refresh Token

The Refresh Token is used to obtain a new Access Token after the Access Token expires.

Instead of forcing the user to log in again every time the Access Token expires, the application uses the Refresh Token to generate a new Access Token.

The Refresh Token is stored in an **HTTP-only cookie**.

The flow is:

```text
Access Token expires
        ↓
API returns 401
        ↓
Frontend requests /auth/refresh
        ↓
Backend verifies Refresh Token
        ↓
New Access Token generated
        ↓
Original request is retried
```

The HTTP-only cookie prevents client-side JavaScript from directly reading the Refresh Token.

\---

# 🔄 Complete Authentication Flow

## Registration

```text
User
 │
 │ Register
 ▼
React Frontend
 │
 │ POST /api/auth/register
 ▼
Vercel Rewrite
 │
 ▼
Express Backend
 │
 ├── Receive user details
 ├── Hash password using bcrypt
 ├── Store user in MongoDB
 ├── Generate Access Token
 └── Generate Refresh Token
        │
        ▼
HTTP-only Refresh Token Cookie
```

\---

## Login

```text
User
 │
 │ Login
 ▼
React Frontend
 │
 │ POST /api/auth/login
 ▼
Express Backend
 │
 ├── Find user
 ├── Verify password
 ├── Generate Access Token
 └── Generate Refresh Token
        │
        ▼
HTTP-only Refresh Token Cookie
```

\---

# ♻️ Automatic Access Token Refresh

One of the main features of this project is automatic token renewal.

For example, when a user reloads the Profile page:

```text
Reload /profile
       ↓
GET /api/auth/me
       ↓
Access Token expired
       ↓
401 Unauthorized
       ↓
POST /api/auth/refresh
       ↓
Refresh Token verified
       ↓
New Access Token generated
       ↓
GET /api/auth/me again
       ↓
200 OK
       ↓
Profile loaded
```

This is handled using an **Axios response interceptor**.

The interceptor watches for a `401 Unauthorized` response. When the Access Token has expired, it requests a new Access Token through the refresh endpoint and retries the original request.

This allows the user to remain authenticated without manually logging in again after every Access Token expiration.

\---

# 🔑 Access Token vs Refresh Token

|Feature|Access Token|Refresh Token|
|-|-|-|
|Purpose|Authenticate API requests|Generate a new Access Token|
|Lifetime|Short-lived|Long-lived|
|Used frequently|Yes|No|
|Sent with protected requests|Yes|No|
|Storage|Used by frontend authentication state|HTTP-only cookie|
|Used when expired|No|Yes|

The two-token approach separates normal API authentication from token renewal.

\---

# 🛡️ Protected Routes

The application contains protected functionality such as:

```text
/profile
```

The frontend uses authentication state to control access to protected pages.

The backend also validates the Access Token for protected API requests, so security does not depend only on frontend route protection.

\---

# 🌐 API Routing

The frontend uses `/api` as its API base path.

Examples:

```text
/api/auth/register
/api/auth/login
/api/auth/me
/api/auth/refresh
```

The backend exposes the authentication router under:

```text
/auth
```

The `/api` prefix is handled by the frontend proxy/rewrite layer.

## Development

During local development, the Vite development server proxies `/api` requests to the local Express server.

```text
React
 │
 │ /api/auth/login
 ▼
Vite Proxy
 │
 ▼
Local Express Server
 │
 ▼
/auth/login
```

## Production

In production, Vercel rewrites `/api` requests to the deployed Render backend.

```text
React
 │
 │ /api/auth/me
 ▼
Vercel Rewrite
 │
 ▼
Render Backend
 │
 │ /auth/me
 ▼
Express
```

This keeps the frontend API calls consistent between development and production.

\---

# 📁 Project Structure

```text
AuthenticationSystem/
│
├── client/
│   ├── src/
│   │   ├── modules/
│   │   │   └── auth/
│   │   │       ├── pages/
│   │   │       └── ...
│   │   ├── auth/
│   │   └── ...
│   │
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routers/
│   │   └── utils/
│   │
│   ├── Server.js
│   └── package.json
│
└── README.md
```

\---

# ⚙️ Environment Variables

The project uses environment variables for sensitive configuration.

## Backend

Create a `.env` file inside the `server` directory.

```env
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

> \*\*Important:\*\* Never commit your `.env` file or secret values to GitHub.

The exact MongoDB environment-variable name should match the variable used by your backend database configuration.

\---

# 🧪 Run the Project Locally

## 1\. Clone the repository

```bash
git clone <your-github-repository-url>
cd AuthenticationSystem
```

## 2\. Install backend dependencies

```bash
cd server
npm install
```

## 3\. Configure backend environment variables

Create:

```text
server/.env
```

and add your MongoDB connection string and JWT secrets.

## 4\. Start the backend

```bash
node Server.js
```

## 5\. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

## 6\. Start the frontend

```bash
npm run dev
```

The frontend will run through the Vite development server.

\---

# 🚀 Deployment

The project is deployed using three services:

```text
Frontend
   ↓
Vercel

Backend
   ↓
Render

Database
   ↓
MongoDB Atlas
```

### Frontend

The React/Vite application is deployed on Vercel.

### Backend

The Node.js/Express API is deployed on Render.

### Database

MongoDB Atlas is used as the cloud database.

\---

# 🔀 Vercel Rewrite

The production frontend uses a Vercel rewrite so that API requests can continue using `/api`.

Example:

```text
/api/auth/login
```

is rewritten to:

```text
https://authenticationsystem-yeui.onrender.com/auth/login
```

This keeps the API structure simple from the frontend.

\---

# 📚 What I Learned

Building this project helped me understand several important concepts in full-stack development:

* JWT authentication
* Access Tokens and Refresh Tokens
* Token expiration
* Automatic token refresh
* HTTP-only cookies
* Password hashing with bcrypt
* Express middleware
* Protected API routes
* Axios request and response interceptors
* React authentication state
* MongoDB and Mongoose
* API proxying
* Vercel rewrites
* Full-stack deployment

The most important learning was understanding that authentication is more than just creating a login form. It involves managing token lifetimes, securely handling credentials, protecting API endpoints, and keeping the user authenticated when short-lived tokens expire.

\---

# 🔮 Future Improvements

Possible improvements for the project include:

* 📧 Email verification
* 🔑 Forgot/reset password
* 🔐 OAuth authentication
* ♻️ Refresh token rotation
* 👥 Role-based authorization
* 🚪 Logout from all devices
* 🛡️ Rate limiting
* 📱 Better responsive UI
* 🔒 Additional security headers
* 📊 Authentication/session management dashboard

\---

# 👨‍💻 Author

**Shanu Ojha**

A full-stack authentication project built to understand modern authentication architecture, JWT token management, protected routes, API interceptors, and deployment.

\---
