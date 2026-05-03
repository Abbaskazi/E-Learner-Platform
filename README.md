
# E-Learning Platform

A full-stack course learning platform built with Next.js, Express.js, and MongoDB.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- PDFKit for certificate generation

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Axios

## Features

### Authentication
- Register/Login with JWT tokens stored in HTTP-only cookies
- Roles: student and admin
- Protected routes

### Student Features
- View available courses
- Enroll in courses
- Read course modules with progress tracking
- Take MCQ tests
- Download PDF certificates upon passing

### Admin Features
- Create courses
- Add modules and MCQs

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
cd "d:\DevOps Project"
```

2. Set up Backend:
```bash
cd backend
npm install
```

3. Set up Frontend:
```bash
cd ../frontend
npm install
```

4. Make sure MongoDB is running locally on port 27017, or update the MONGODB_URI in backend/.env

5. Seed the database with sample courses:
```bash
cd ../backend
npm run seed
```
This will create an admin user with:
- Email: admin@example.com
- Password: password123
And 10 sample courses.

### Running the Project

1. Start the backend server:
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

2. Start the frontend server (in a new terminal):
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

## Project Structure

```
DevOps Project/
├── backend/
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── courseController.js
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── courses.js
│   ├── .env
│   ├── server.js
│   ├── seedData.js
│   └── package.json
└── frontend/
    ├── app/
    │   ├── course/[id]/
    │   ├── login/
    │   ├── register/
    │   ├── test/[courseId]/
    │   ├── profile/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   └── ProtectedRoute.tsx
    ├── services/
    │   └── api.ts
    └── package.json
```

## API Endpoints

### Auth
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/logout - Logout user
- GET /api/auth/me - Get current user

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get single course
- POST /api/courses - Create course (admin only)
- POST /api/courses/enroll/:courseId - Enroll in course
- POST /api/courses/progress/:courseId/module/:moduleId - Update module progress
- POST /api/courses/test/:courseId/submit - Submit test
- GET /api/courses/certificate/:courseId - Download certificate
