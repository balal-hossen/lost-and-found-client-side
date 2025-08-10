# 📦 WhereIsIt - Lost and Found Items Platform

## 🔍 Project Overview
WhereIsIt is a full-stack lost and found items platform that allows users to report, view, and recover lost or found items. It connects people who have lost their belongings with those who may have found them.

---

## 🌐 Live Website
🔗 [Live Link](https://lost-and-found-website-8c162.web.app)

---

## 📁 GitHub Repositories

- 🔗 [Client Repository](https://github.com/BELALKHANBK/lost-and-found-client-side)
- 🔗 [Server Repository](https://github.com/BELALKHANBK/lost-and-found-server-site)

---

## 🚀 Features

### 🧑 Authentication System
- Email & Password login and registration
- Google login (social auth)
- JWT-based token system with secure API access
- Form validation with strong password rules
- Toast/SweetAlert messages for auth feedback

### 🏠 Home Page
- Slider with 3 meaningful banners
- Latest 6 lost/found items preview
- See All button redirects to All Items page
- 2 extra meaningful sections
- Framer motion animations

### 📋 Functional Pages
- **Add Lost & Found Item** (Private Route)  
- **All Items Page** – with search bar to filter by title/location
- **Item Details Page** – conditionally show buttons for Found/Lost actions
- **Manage My Items Page** – update/delete personal items
- **Update Item Page** – pre-filled form to update post
- **Recovered Items Page** – toggle layout between card & table
- **404 Not Found Page**

### ⚙️ Recovered Modal
- Opens from details page
- Auto-filled recovered person info
- Recovered date picker
- Recovered data saved in a separate collection and status updated

### 🧠 Additional Features
- Fully responsive (mobile, tablet, desktop)
- Dynamic Page Title (Helmet Async)
- Spinner while loading data
- SweetAlert for all CRUD actions
- Protected Routes using Firebase and JWT

---

## 🔒 Security
- Firebase config keys stored in `.env` (client)
- MongoDB credentials stored in `.env` (server)
- JWT used for protecting APIs and private routes

---

## 🧪 Optional Features Implemented
- Used [shadcn/ui](https://ui.shadcn.com/) for modern UI components
- Implemented layout toggle (card to table) on Recovered Items page
- Framer Motion used for page animations
- Added custom email notification feature using `nodemailer`

---

## 🔧 Technology Stack

### 🖥️ Frontend
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI + shadcn/ui
- Axios
- React Hook Form
- Firebase Auth
- React Helmet Async
- React Datepicker
- Framer Motion
- SweetAlert2
- Lottie (optional)

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- CORS, Dotenv
- JWT (`jsonwebtoken`)
- Nodemailer

---

## 📄 Environment Variables

### 🧪 Client `.env` Example
