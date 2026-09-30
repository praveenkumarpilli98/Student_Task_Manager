# Student Task Manager - Backend API

The Node.js, Express, and TypeScript REST API service for the Student Task Manager application.

## Features

- **Authentication**: JWT-based login and registration with bcrypt password hashing.
- **Task Management**: Full CRUD operations for student tasks (create, read, update, delete, complete).
- **Security & Authorization**: Route protection using JWT middleware; ensures students only access their own tasks.
- **Search & Filtering**: Search tasks by keywords in title/description and filter by status (All, Pending, Completed) and priority (Low, Medium, High).
- **Statistics**: Automated task metrics (Total, Completed, Pending).
- **Robust Error Handling**: Centralized error middleware handling validation, duplicate records, and invalid IDs.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database connection
│   │   └── db.ts
│   ├── controllers/     # Request handlers
│   │   ├── authController.ts
│   │   └── taskController.ts
│   ├── middleware/      # JWT authentication and error handlers
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── models/          # Mongoose database schemas
│   │   ├── Task.ts
│   │   └── User.ts
│   ├── routes/          # Express route definitions
│   │   ├── authRoutes.ts
│   │   └── taskRoutes.ts
│   └── server.ts        # Express application bootstrap
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` folder based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student-task-manager
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Start MongoDB

Ensure MongoDB server is running locally on port 27017 or use a cloud MongoDB Atlas connection URI.

### 4. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new student account | Public |
| `POST` | `/api/auth/login` | Log in and receive JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated student profile | Private (Bearer Token) |

### Tasks

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/tasks` | Get all tasks for authenticated user (supports `?status=`, `?priority=`, `?search=`, `?sortBy=`) | Private (Bearer Token) |
| `GET` | `/api/tasks/:id` | Get single task by ID | Private (Bearer Token) |
| `POST` | `/api/tasks` | Create a new task | Private (Bearer Token) |
| `PUT` | `/api/tasks/:id` | Update an existing task | Private (Bearer Token) |
| `DELETE` | `/api/tasks/:id` | Delete a task | Private (Bearer Token) |
| `PATCH` | `/api/tasks/:id/complete` | Toggle task completion status | Private (Bearer Token) |
