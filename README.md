# Blog Platform - Full Project Overview

## 📋 Project Summary

A full-stack blog application enabling users to create, discover, and manage blog posts with authentication, social features, and administrative controls.

## 🏗️ Architecture Overview

### **Backend (Node.js/Express)**

- **Entry Point**: `server.js` → Loads env vars, connects MongoDB, starts server on port 5000
- **Core App**: `src/app.js` → Express setup with CORS, cookie parsing, JSON middleware
- **API Structure**:
  - `/api/user` → Auth, profile management
  - `/api/blog` → Blog CRUD, likes, publishing
  - `/api/comment` → Comment operations
- **Key Components**:
  - **Controllers**: Business logic (user registration/login, blog operations, profile updates)
  - **Models**: Mongoose schemas (User, Blog, Comment)
  - **Middleware**: JWT auth, file upload handling (Multer + Cloudinary)
  - **Utilities**: Response formatting, data conversion, Cloudinary config

### **Frontend (React/Vite)**

- **Build Tool**: Vite for fast development/builds
- **State Management**: Redux Toolkit with persistence
  - `authSlice`: Authentication state
  - `themeSlice`: Light/dark theme
  - `blogSlice`: Blog data management
- **Routing**: React Router DOM for client-side navigation
- **Styling**: Tailwind CSS with custom configuration
- **UI Library**: Shadcn-based components (`src/components/ui/`)

## 🔑 Key Features Implemented

### **Authentication & Security**

- User registration with validation
- Secure login using JWT HTTP-only cookies (7-day expiry)
- Logout functionality
- Protected routes via authentication middleware
- Password hashing with bcrypt

### **Blog Management**

- Full CRUD operations for blog posts
- Draft/publish toggle functionality
- Image uploads via Cloudinary integration
- Like/dislike system for posts
- Author attribution with profile links
- Category tagging system

### **Social Features**

- Commenting system (referenced in blog model)
- User profiles with bio, social links, skills
- Author bios and contact information display
- User listing functionality

### **User Experience**

- Responsive design with Tailwind CSS
- Light/dark theme support with persistence
- Toast notifications for user feedback
- Loading states and spinners
- Persistent state (preferences maintained via Redux Persist)
- Dashboard for managing posts, profile, and comments

## 📁 Project Structure

```
Blog_Post/
├── backend/
│   ├── server.js
│   ├── src/
│   │   ├── app.js
│   │   ├── Controller/     # User, blog, comment logic
│   │   ├── Database/       # MongoDB connection
│   │   ├── Models/         # User, Blog, Comment schemas
│   │   ├── Routes/         # API endpoint definitions
│   │   ├── middlewares/    # Auth, upload handling
│   │   └── utils/          # Response, Cloudinary, dataUri helpers
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── Pages/          # BlogView, CreateBlog, UpdateBlog, etc.
│   │   ├── section/        # Navbar, Hero, BlogCard, Dashboard, etc.
│   │   ├── Redux/          # store.js, slices (auth, theme, blog)
│   │   ├── components/ui/  # Shadcn UI components
│   │   ├── assets/         # Images, icons
│   │   └── lib/            # Utility functions
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
├── README.md
└── .gitignore
```

## 🛠️ Technology Stack

| Layer                 | Technologies                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------- |
| **Frontend**          | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, Axios, Lucide Icons, Sonner Toast |
| **Backend**           | Node.js, Express.js, MongoDB (Mongoose ODM)                                                  |
| **Authentication**    | JWT (JSON Web Tokens) with HTTP-only cookies                                                 |
| **Media Storage**     | Cloudinary with Multer for file handling                                                     |
| **State Persistence** | Redux Persist                                                                                |
| **Development**       | ESLint, Nodemon (dev)                                                                        |

## 🔄 Data Flow

1. **User Interaction** → Frontend component actions
2. **API Request** → Sent to Express backend with auth cookies
3. **Auth Middleware** → Verifies JWT, attaches user ID to request
4. **Controller Logic** → Processes request, validates data
5. **Model Operations** → Mongoose performs DB operations on MongoDB
6. **Response** → Standardized JSON returned via response utility
7. **Frontend Update** → Redux store updated, components re-render

## ⚙️ Environment & Setup

- **Backend**: Runs on port 5000 (`process.env.PORT || 5000`)
- **Frontend**: Runs on port 5173 (Vite default)
- **CORS**: Configured to allow frontend origin with credentials
- **Environment Variables**: Managed via `.env` (JWT secret, DB URI, Cloudinary config, etc.)
- **Database**: MongoDB with automatic timestamping

## 📝 Current Status

The application implements all core blogging platform features:

- ✅ User authentication (register/login/logout)
- ✅ Profile management with avatar upload
- ✅ Blog creation/editing/deletion
- ✅ Draft/publish workflow
- ✅ Social features (likes, comments)
- ✅ Responsive UI with theme support
- ✅ Protected routes and secure authentication
- ✅ Image handling via Cloudinary
- ✅ State persistence across sessions

This is a well-structured, production-ready full-stack application following modern development practices with clear separation of concerns, secure authentication, and comprehensive feature set for a blogging platform.
