🛒 Pro Template Studio
Full-Stack MERN E-Commerce Platform for Website Templates

Pro Template Studio is a full-stack e-commerce web application built using the MERN stack.
It allows users to browse, wishlist, and purchase professionally designed website templates with secure authentication, cart management, payment integration, and an AI-powered assistant.

This project is designed to closely resemble a real-world SaaS / product-based application.

**🚀 Key Features**\
🔐 Authentication & Security

 - User Sign Up & Login with JWT authentication

 - Secure password validation (uppercase, number, symbol, min length)

 - Protected routes for cart, wishlist, and checkout

🏠 Templates Marketplace

 - Dynamic template listing from MongoDB

 - Category-based filtering (Portfolio, Business, E-commerce, etc.)

 - Individual product detail pages with preview images

❤️ Wishlist

 - Add / remove templates from wishlist

 - User-specific wishlist stored in database

🛒 Cart & Checkout

 - Add / remove templates from cart

 - Automatic total price calculation

 - Persistent cart data per user

 - Checkout flow with payment integration

💳 Payment Integration

 - Secure server-side payment handling

 - Ready for real-world payment gateway usage

🤖 AI Chatbot Assistant

 - Helps users find suitable templates

 - Displays template name, price, and description

 - Simple, user-friendly conversational flow

🧠 Tech Stack
Frontend

 - React.js (Vite)

 - React Router

 - Axios

 - Custom CSS (fully responsive UI)

Backend

 - Node.js

 - Express.js

 - MongoDB & Mongoose

 - JWT Authentication

🗂️ Project Structure
Frontend
```text
client/
 ├── src/
 │   ├── api/            # Axios & API services
 │   ├── components/     # Reusable UI components
 │   ├── pages/          # Home, Login, Cart, Wishlist, etc.
 │   ├── App.jsx
 │   └── main.jsx
```
Backend
```text
server/
 ├── src/
 │   ├── controllers/    # Business logic
 │   ├── routes/         # REST APIs
 │   ├── models/         # MongoDB schemas
 │   ├── middleware/     # Auth middleware
 │   ├── config/         # Database config
 │   └── index.js
```
🔐 Environment Variables

Create a .env file in the server folder:
```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
▶️ How to Run the Project\
**Backend**\
cd server\
npm install\
npm run dev

**Frontend**\
cd client\
npm install\
npm run dev


📚 What I Learned

 - End-to-end full-stack development

 - JWT authentication & protected routes

 - REST API design & error handling

 - MongoDB schema design & relations

 - Payment integration workflow

 - AI chatbot integration

 - Debugging real production-like issues

 - Writing clean, scalable code






