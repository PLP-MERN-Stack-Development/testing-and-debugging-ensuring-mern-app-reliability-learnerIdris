# 🧠 MERN Stack Todo App with Testing

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js) featuring comprehensive testing coverage for both frontend and backend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Modern and responsive UI with Tailwind CSS
- ✅ RESTful API backend
- ✅ MongoDB database integration
- ✅ Comprehensive test coverage
  - Backend API tests with Jest and Supertest
  - Frontend component tests with Vitest and React Testing Library
- ✅ In-memory MongoDB for testing

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **MongoDB Memory Server** - In-memory MongoDB for testing

## 📁 Project Structure

```
mern-todo-testing/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Database configuration
│   │   ├── models/
│   │   │   └── Todo.js         # Todo model schema
│   │   ├── routes/
│   │   │   └── todoRoutes.js   # API routes
│   │   ├── tests/
│   │   │   └── todo.test.js    # Backend tests
│   │   └── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── TodoItem.jsx    # Todo item component
│   │   ├── lib/
│   │   │   └── api.js          # API client
│   │   ├── App.jsx             # Main app component
│   │   ├── App.test.jsx        # Frontend tests
│   │   ├── setupTests.js       # Test setup
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # ESLint configuration
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (v6 or higher) - for production
- **Git** - for version control

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/Week-6-testing.git
cd Week-6-testing
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Set up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd ../backend
touch .env
```

Add the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-todo
NODE_ENV=development
```

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production

```bash
cd backend
npm start
```

## 🧪 Testing

This project includes comprehensive testing for both frontend and backend.

### Backend Tests

The backend uses **Jest** and **Supertest** with **MongoDB Memory Server** for isolated testing.

```bash
cd backend
npm test
```

**Test Coverage:**
- ✅ GET /api/todos - Fetch all todos
- ✅ POST /api/todos - Create a new todo
- ✅ PUT /api/todos/:id - Update a todo
- ✅ DELETE /api/todos/:id - Delete a todo

### Frontend Tests

The frontend uses **Vitest** and **React Testing Library** for component testing.

```bash
cd frontend
npm test
```

**For interactive test UI:**

```bash
npm run test:ui
```

**Test Coverage:**
- ✅ Renders application title
- ✅ Loads and displays todos
- ✅ Adds a new todo
- ✅ Toggles todo completion status

### Fixing Common Test Issues

If you encounter the error `ReferenceError: expect is not defined`, update your configuration:

**1. Fix `vite.config.js`:**

```javascript
test: {
  environment: "jsdom",
  setupFiles: "./src/setupTests.js",
  globals: true,  // ← Change from 'global' to 'globals'
  include: ["src/**/*test.{js,jsx}"]
}
```

**2. Fix `src/setupTests.js`:**

```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo by ID |
| DELETE | `/todos/:id` | Delete a todo by ID |

### Request/Response Examples

#### Create Todo

**Request:**
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn MERN Stack"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Learn MERN Stack",
  "completed": false,
  "createdAt": "2025-10-31T10:00:00.000Z",
  "updatedAt": "2025-10-31T10:00:00.000Z"
}
```

#### Update Todo

**Request:**
```bash
PUT /api/todos/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "completed": true
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Learn MERN Stack",
  "completed": true,
  "createdAt": "2025-10-31T10:00:00.000Z",
  "updatedAt": "2025-10-31T10:15:00.000Z"
}
```

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mern-todo` |
| `NODE_ENV` | Environment (development/production/test) | `development` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Coding Standards

- Follow ESLint rules for JavaScript/React
- Write tests for new features
- Maintain test coverage above 80%
- Use meaningful commit messages

## 📝 Scripts Reference

### Backend Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run Jest tests
```

### Frontend Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run Vitest tests
npm run test:ui  # Run tests with UI
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

If you can't connect to MongoDB:
1. Ensure MongoDB is running: `sudo systemctl status mongod`
2. Start MongoDB: `sudo systemctl start mongod`
3. Check your `MONGODB_URI` in `.env`

### Port Already in Use

If port 5000 or 5173 is already in use:
```bash
# Find process using the port
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### CORS Issues

Ensure your backend has CORS properly configured in `server.js`:
```javascript
app.use(cors());
```

## 📚 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **PLP MERN Stack Development** - [GitHub Organization](https://github.com/PLP-MERN-Stack-Development)

## 🙏 Acknowledgments

- PLP Academy for the MERN Stack curriculum
- The MERN Stack community
- All contributors and students

---

**Built with ❤️ for learning and mastering the MERN Stack**

For questions or support, please open an issue in the repository.
