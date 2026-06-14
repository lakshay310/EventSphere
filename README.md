# 🎯 EventSphere

> A modern, full-featured **College Event Management Platform** built with React 19 + Vite. Discover events, join clubs, track registrations, and explore campus activity — all in one beautifully designed interface.

---

## ✨ Features

### 👤 For Students (Participants)
- **Landing Page** — Animated hero with event highlights and call-to-action
- **Events Page** — Browse, filter, and register for campus events by category
- **Clubs Page** — Explore college clubs (Technical, Cultural, Arts, Sports) and join them
- **My Dashboard** — Personalized analytics with:
  - Registration stats (Bar, Pie & Doughnut charts via Chart.js)
  - Table of all registered events with date, venue & category
- **About Page** — Platform info and team details

### 🔐 Authentication
- Login & Signup with role-based access
- Protected routes using React Context API (`AuthContext`)
- Persistent session via `json-server` mock backend

### 🏗️ Architecture
- **Frontend:** React 19 + React Router v7 (SPA)
- **Backend:** `json-server` REST API (mock database via `users.json`)
- **Charts:** Chart.js + react-chartjs-2 (Bar, Pie, Doughnut)
- **Build Tool:** Vite 7

---

## 🗂️ Project Structure

```
eventspheresample/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Side navigation (dashboard)
│   │   └── ProtectedRoute.jsx  # Auth guard for private routes
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── pages/
│   │   ├── LandingPage.jsx     # Public home / hero page
│   │   ├── LoginPage.jsx       # Login form
│   │   ├── HomePage.jsx        # Post-login home
│   │   ├── EventsPage.jsx      # Events listing & registration
│   │   ├── ClubsPage.jsx       # Clubs listing & joining
│   │   ├── DashboardPage.jsx   # User analytics dashboard
│   │   └── AboutPage.jsx       # About the platform
│   ├── App.jsx                 # Routes definition
│   └── main.jsx                # React entry point
├── users.json                  # json-server database (users, events, registrations)
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eventspheresample.git
cd eventspheresample
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

This command concurrently starts:
- ⚡ **Vite** dev server at `http://localhost:5173`
- 🗄️ **json-server** mock API at `http://localhost:3000`

> **Note:** Both must be running at the same time for the app to work correctly.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both Vite + json-server concurrently |
| `npm run client` | Start only the Vite frontend |
| `npm run server` | Start only the json-server backend |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview the production build locally |

---

## 🛣️ Routes

| Path | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/about` | About | Public |
| `/home` | Home | 🔒 Protected |
| `/events` | Events | 🔒 Protected |
| `/clubs` | Clubs | 🔒 Protected |
| `/dashboard` | Dashboard | 🔒 Protected |

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI Framework |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Analytics charts |
| [json-server](https://github.com/typicode/json-server) | Mock REST API / backend |
| [concurrently](https://github.com/open-cli-tools/concurrently) | Run multiple scripts in parallel |
| Vanilla CSS | Custom styling, animations |

---

## 📊 Dashboard Preview

The dashboard displays real-time data fetched from `json-server`:
- **Bar Chart** — Your event registrations by event name
- **Pie Chart** — Campus-wide registrations broken down by category
- **Doughnut Chart** — Club distribution by type
- **Stats Cards** — Quick summary of your activity vs campus totals
- **Registrations Table** — Full history of your event sign-ups

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <p>Built with ❤️ for campus communities</p>
<<<<<<< HEAD
</div>
=======
</div>
>>>>>>> f2b406d4072e4e57d81efbea101d75c5660bb298
