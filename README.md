# 📦 WhereIsIt - Lost and Found Items Platform

## 🔍 Project Overview

**WhereIsIt** is a full-stack lost and found items platform that allows users to report, view, and recover lost or found items. It connects people who have lost their belongings with those who may have found them, making the process simple and transparent.

---

## 🌐 Live Website

🔗 [Live Link](https://lost-and-found-website-8c162.web.app)

---

## 📁 GitHub Repositories

* 🔗 [Client Repository](https://github.com/BELALKHANBK/lost-and-found-client-side)
* 🔗 [Server Repository](https://github.com/balal-hossen/lost-and-found-backend)

---

## 🚀 Features

### 🧑 Authentication System

* Email & Password login and registration
* Google login (social auth)
* JWT-based token system with secure API access
* Form validation with strong password rules
* Toast/SweetAlert messages for authentication feedback

### 🏠 Home Page

* Slider with 3 meaningful banners
* Latest 6 lost/found items preview
* See All button redirects to All Items page
* 2 extra meaningful sections
* Framer Motion animations

### 📋 Functional Pages

* **Add Lost & Found Item** (Private Route)
* **All Items Page** – view all lost & found items with search and filter by title/location
* **Item Details Page** – shows item details with Found/Lost action buttons
* **Manage My Items Page** – update or delete personal posts
* **Update Item Page** – pre-filled form for updating posts
* **Recovered Items Page** – toggle between card & table layout
* **All Recovered Items Page** – view all recovered items globally
* **Admin Dashboard** – manage users, items, and recoveries
* **User Dashboard** – manage personal posts, view history
* **Contact Page** – send messages to admin
* **404 Not Found Page**

### ⚙️ Recovered Modal

* Opens from item details page
* Auto-filled recovered person info
* Date picker for recovery date
* Saves recovered data in a separate collection and updates item status automatically

### 🧠 Additional Features

* Fully responsive design (mobile, tablet, desktop)
* Dynamic page title with React Helmet Async
* Loading skeletons / spinners while fetching data
* SweetAlert notifications for all CRUD actions
* Protected routes using Firebase Auth and JWT

---

## 🔒 Security

* Firebase config keys stored securely in `.env` (client)
* MongoDB credentials stored securely in `.env` (server)
* JWT used for protecting APIs and private routes

---

## 🔧 Technology Stack

### 🖥️ Frontend

* React.js
* React Router DOM
* Tailwind CSS
* DaisyUI + shadcn/ui components
* Axios
* React Hook Form
* Firebase Authentication
* React Helmet Async
* React Datepicker
* Framer Motion
* SweetAlert2
* Lottie animations (optional)

### 🖥️ Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* CORS, Dotenv
* JWT (`jsonwebtoken`)
* Nodemailer for notifications

---

## 📄 Environment Variables

### 🧪 Client `.env` Example

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 🧪 Server `.env` Example

```env
DB_USER_NAME=your_mongodb_username
DB_USER_PASS=your_mongodb_password
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
```

---

## 📦 Deployment

* Frontend deployed on Firebase Hosting
* Backend deployed on Vercel
* Fully integrated and live, supporting cross-origin requests with CORS configuration

---

## 💡 Notes

* All forms have validation and error handling
* Admin dashboard controls users, posts, and recovered items
* Users can manage their own posts from their dashboard
* All CRUD operations show feedback via SweetAlert2
* Loading skeletons/spinners improve user experience on data fetch
