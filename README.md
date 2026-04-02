# BorrowBox

BorrowBox is a **full-stack MERN campus sharing platform** where students can **borrow, lend, donate, and request items** from each other.

It helps students save money, reduce waste, and build a stronger campus community.

## ✨ Features

* 🔐 Custom authentication (signup/login)
* 👤 User profile with phone number support
* ➕ Add new items with image upload
* 🖼️ Cloudinary image hosting
* 🔍 Explore all listed items
* 📄 Detailed item page
* 📲 Contact owner directly on WhatsApp
* 🙋 Request item system
* 📥 Incoming requests page for owners
* 📊 Dashboard with listings overview
* 🗂️ My Listings page
* 🗑️ Delete listed items
* 📱 Fully responsive modern UI

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* React Hot Toast
* Context API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Cloudinary
* Nodemon
* dotenv

## 🔐 Authentication

BorrowBox uses **custom authentication built from scratch**.

We did **not use Firebase or Supabase**.

Authentication flow includes:

* User signup with name, email, phone, password
* Login using backend API
* User data stored in MongoDB Atlas
* Frontend session persistence using localStorage + Context API
* Protected dashboard flow

## ☁️ Database & Storage

* **MongoDB Atlas** → stores users, items, requests
* **Cloudinary** → stores uploaded item images

## 📂 Project Structure

```bash
BorrowBox/
├── borrow-box                # Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── borrow-box-backend        # Backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
```

## ⚙️ Local Setup

### 1) Clone the repository

```bash
git clone https://github.com/manojrahar/BorrowBox.git
cd BorrowBox
```

### 2) Setup frontend

```bash
cd borrow-box
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

### 3) Setup backend

Open new terminal:

```bash
cd BorrowBox/borrow-box-backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

## 🔑 Environment Variables

### Frontend (`borrow-box/.env`)

```env
VITE_API_URL=http://localhost:5000
```

### Backend (`borrow-box-backend/.env`)

```env
MONGO_URI=your_mongodb_atlas_url
PORT=5000
JWT_SECRET=your_secret_key
```

## 🌍 Main Pages

* Home
* Login
* Signup
* Explore
* Add Item
* Item Details
* Dashboard
* My Listings
* Requests
* Profile

## 💡 Real-World Use Case

This project solves a real student problem:

* borrowing calculators before exams
* lending books
* donating accessories
* sharing electronics
* campus sustainability

## Deployment Ready

This project is ready for deployment using:

* **Vercel → Frontend**
* **Render → Backend**
* **MongoDB Atlas → Database**
* **Cloudinary → Images**

## 👨‍💻 Author

**Manoj Rahar**

Frontend-focused developer building real-world MERN projects.

---

⭐ If you like this project, give it a star on GitHub.
