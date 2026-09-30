# Student Task Manager - Frontend

A modern, responsive React + TypeScript + Vite web dashboard designed for students to organize assignments, track tasks, and stay on top of deadlines.

## Features

- **Responsive Design**: Designed for desktop, tablet, and mobile with a collapsible drawer sidebar.
- **Authentication**: Seamless student registration and login flows with JWT token management and protected routes.
- **Live Metrics**: Real-time stats showing Total, Completed, and Pending tasks.
- **Task Management**:
  - Create new tasks with title, description, priority, and due dates.
  - Quick-toggle completion with visual strike-through and badge updates.
  - Edit existing tasks via modal form.
  - Delete tasks with confirmation dialog.
- **Search & Filter**: Real-time search across task titles and descriptions, filter by completion status (All, Pending, Completed), filter by priority level (Low, Medium, High), and sort by newest, due date, priority, or title.
- **Student Profile**: View student account information, join date, and accomplishment stats.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios with request/response interceptors
- **Icons**: Lucide React
- **Styling**: Pure modern CSS with custom properties (CSS variables)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (Optional)

Create a `.env` file if connecting to an external backend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
npm run preview
```
