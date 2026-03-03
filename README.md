# BlogApp

# MERN Blog Application

A full-stack Blog Application built using the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- User Authentication (JWT)
- Signup / Login
- Create Post (with image upload)
- Delete Post (only post owner)
- Search by title & tags
- Pagination
- Like / Unlike Posts
- Comment System
- Dark / Light Mode (Frontend)
- Protected Routes
- Image upload using Multer (stored locally)

---

# 🛠️ Tech Stack

Frontend:
- React (TypeScript)
- Bootstrap
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

# 📦 Setup Instructions

# Backend Setup

Navigate to the backend folder:

cd server

Install dependencies:

npm install

Create a .env file inside the server folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

If you are using MongoDB Atlas, replace MONGO_URI with your cloud connection string.

Start the backend server:

npm run dev

The backend will run on:
http://localhost:5000

#Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd client

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend will run on:
http://localhost:5173

