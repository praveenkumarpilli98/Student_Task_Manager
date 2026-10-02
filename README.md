# Student Task Manager

A full-stack student productivity and task management web application built to help learners, college students, and developers organize assignments, monitor coursework, and meet academic deadlines efficiently.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Security Practices](#security-practices)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Description

**Student Task Manager** is designed specifically for students who need a straightforward, fast, and responsive tool to keep track of assignments, exams, study schedules, and project milestones. 

With secure user authentication, each student manages their own private workspace. The dashboard provides instant statistical insights (Total, Completed, and Pending tasks), priority indicators, smart search, and flexible status filters to ensure deadlines are never missed.

---

## Features

### Frontend (User Interface & Experience)
- **Student Authentication**: Clean registration and login interfaces with field validation.
- **Dynamic Productivity Dashboard**:
  - Welcome greeting personalized with the student's name.
  - Live statistics summary: **Total Tasks**, **Completed Tasks**, and **Pending Tasks**.
- **Comprehensive Task Operations (CRUD)**:
  - Create tasks with title, description, priority, and optional due date.
  - Edit task details in an accessible modal dialog.
  - Delete tasks with confirmation dialogs.
  - Single-click completion toggle with visual strikethrough.
- **Search & Filters**:
  - Real-time search across task titles and descriptions.
  - Status filter: **All**, **Pending**, **Completed**.
  - Priority filter: **Low**, **Medium**, **High** with color-coded badges.
  - Sorting: Newest first, due date, priority, or title (A-Z).
- **Responsive Layout**: Adapts smoothly to mobile phones, tablets, and widescreen desktop monitors with a slide-out navigation drawer.
- **Student Profile**: Modal showing account details, email, join date, and total accomplished tasks.
- **Protected Routing**: Guarantees unauthorized visitors cannot access dashboard data.

### Backend (REST API)
- **Secure Authentication**:
  - Registration and login endpoints.
  - Password hashing via `bcryptjs` (salt rounds: 10).
  - Stateless authentication with JSON Web Tokens (JWT).
- **Protected Resources**: Strict authorization middleware ensuring users can only read, update, or delete their own tasks.
- **Data Validation & Sanitization**: Comprehensive checking for required fields, valid email structures, and priority levels.
- **Centralized Error Handling**: Clear HTTP status codes and user-friendly error messages for validation, duplicate keys, and invalid resource IDs.

---

## Technologies

### Frontend
- **React 18** - Declarative UI library
- **TypeScript** - Type safety and maintainability
- **Vite** - High-performance next-generation frontend build tool
- **Axios** - HTTP client configured with request/response interceptors
- **Lucide React** - Clean and accessible modern iconography
- **CSS3** - Responsive CSS layout with custom properties (CSS variables)

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Fast, minimalist REST API framework
- **TypeScript** - Strongly typed server-side code

### Database
- **MongoDB** - Document-based NoSQL database
- **Mongoose ODM** - Object data modeling with schemas, indexes, and validation

### Authentication & Security
- **JSON Web Tokens (`jsonwebtoken`)** - Secure session authorization
- **Bcrypt (`bcryptjs`)** - One-way cryptographic password hashing
- **CORS** - Configured Cross-Origin Resource Sharing

---

## Project Structure

```text
student-task-manager/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection initialization
│   │   │   └── db.ts
│   │   ├── controllers/     # Request handlers (auth, tasks)
│   │   │   ├── authController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/      # JWT auth guard & centralized error handler
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   ├── models/          # Mongoose schemas (User, Task)
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── routes/          # Express route definitions
│   │   │   ├── authRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   └── server.ts        # Server entry point & middleware wiring
│   ├── .env.example         # Backend environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProfileModal.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   ├── hooks/           # Custom React hooks (useAuth)
│   │   │   └── useAuth.tsx
│   │   ├── pages/           # Application views
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/        # Axios API client and service calls
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── taskService.ts
│   │   ├── types/           # Shared TypeScript interfaces & types
│   │   │   └── index.ts
│   │   ├── App.tsx          # Root routing and auth provider
│   │   ├── main.tsx         # React DOM mount point
│   │   ├── index.css        # Responsive styling and CSS variables
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── .env.example             # Project-wide environment template
├── .gitignore               # Excludes node_modules, .env, build artifacts
└── README.md                # Project documentation
```

---

## Installation

Follow these steps to run the application locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.
- [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/student-task-manager.git
cd student-task-manager
```

---

### Step 2: Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```bash
# In backend/.env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student-task-manager
JWT_SECRET=your_jwt_secret_key_here
```

*(Optional)* Create a `.env` file inside the `frontend/` directory if you wish to override the API target:
```bash
# In frontend/.env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### Step 3: Install Backend Dependencies & Start Server

Open a terminal window:
```bash
cd backend
npm install
npm run dev
```
The backend API server will be available at: `http://localhost:5000`

---

### Step 4: Install Frontend Dependencies & Start Client

Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React frontend application will launch at: `http://localhost:5173`

---

## API Endpoints

All task endpoints require an HTTP `Authorization` header containing the JWT Bearer token:
`Authorization: Bearer <TOKEN>`

### Authentication Endpoints

| Method | Endpoint | Description | Public / Private |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student (`name`, `email`, `password`) | Public |
| `POST` | `/api/auth/login` | Login student and receive JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated student profile | Private |

### Task Endpoints

| Method | Endpoint | Query / Payload | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | `?status=&priority=&search=&sortBy=` | Get all tasks for authenticated student |
| `GET` | `/api/tasks/:id` | None | Get specific task details |
| `POST` | `/api/tasks` | `{ title, description, priority, dueDate }` | Create a new task |
| `PUT` | `/api/tasks/:id` | `{ title, description, priority, dueDate, completed }` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | None | Permanently delete a task |
| `PATCH` | `/api/tasks/:id/complete` | `{ completed?: boolean }` | Toggle task completion status |

---

## Screenshots

> *Placeholder: Add screenshots of your application here once running.*

### Dashboard Overview
```
+------------------------------------------------------------------------------------+
| [🎓 Student Task Manager]                             [ (P) Praveen Kumar ] [Logout]|
+-------------------+----------------------------------------------------------------+
|  [All Tasks   (6)]|  Welcome back, Praveen! 🎓                                     |
|  [Pending     (4)]|  ------------------------------------------------------------- |
|  [Completed   (2)]|  [Total: 6]         [Completed: 2]         [Pending: 4]        |
|                   |  ------------------------------------------------------------- |
|  [Study Tip]      |  [ 🔍 Search... ] [Status: All] [Priority: All] [+ Add Task]   |
|  Break tasks down!|  ------------------------------------------------------------- |
|                   |  +------------------------+  +-------------------------------+ |
|                   |  | [!] High Priority      |  | [*] Medium Priority           | |
|  [Profile Settings|  | Final Year Project Doc |  | Study Database Normalization   | |
|  [Log Out]        |  | Due: Tomorrow          |  | Due: Friday                   | |
+-------------------+--+------------------------+--+-------------------------------+ |
```

---

## Security Practices

- **Password Safety**: Passwords are never saved in plain text; they are hashed with `bcryptjs` and salt rounds.
- **Stateless Authorization**: Signed JSON Web Tokens (JWT) verify user identity across requests.
- **Data Isolation**: Database queries strictly filter by `userId: req.user._id`, ensuring students cannot view, modify, or delete another student's tasks.
- **Environment Isolation**: Sensitive configuration (database strings, tokens) is read via environment variables and excluded from version control via `.gitignore`.
- **Input Validation**: Backend strictly validates request bodies and parameter IDs prior to database operations.

---

## Future Improvements

- **Task Reminders & Notifications**: Automated email notifications 24 hours prior to assignment deadlines.
- **Calendar & Timeline View**: Interactive monthly calendar with drag-and-drop due dates.
- **Dark Mode**: Theme switcher for late-night study sessions.
- **Categories & Tags**: Ability to group tasks by course code (e.g., CS101, MATH201, BIO100).
- **Subtasks & Checklists**: Break large assignments down into hierarchical sub-steps with completion progress bars.
- **Study Analytics & Pomodoro Timer**: Time tracking and productivity trend graphs.

---

## License

This project is licensed under the MIT License - open for educational and personal use.
