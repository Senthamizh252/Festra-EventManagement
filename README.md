# FESTRA &ndash; Event Management Platform

Festra is a full-stack event management platform designed to organize, orchestrate, and track attendee experiences seamlessly — from ticket scans and registration controls to automated certificate compilation.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite (JS)
- **Styling:** Tailwind CSS v4.0
- **Routing:** React Router v7.0
- **HTTP Client:** Axios
- **Icon-Pack:** Lucide React

### Backend (Planned)
- **Runtime:** Node.js
- **Server:** Express.js
- **Database Engine:** MySQL (mysql2 driver)
- **Cryptographic Hashing:** bcryptjs
- **Authentication:** JWT (jsonwebtoken)

---

## 📂 Project Architecture

```text
Festra/
│
├── frontend/                  # React Frontend User Interface
│   ├── src/
│   │   ├── components/        # Reusable global design components (Button, Input, Logo)
│   │   ├── pages/             # Layout pages (Login, Register, Dashboards)
│   │   ├── layouts/           # Page structural structures (AuthLayout)
│   │   ├── services/          # API request modules
│   │   ├── context/           # Shared global states
│   │   ├── hooks/             # Custom react hooks
│   │   ├── utils/             # Local helper methods
│   │   ├── assets/            # Global media assets
│   │   ├── App.jsx            # Routing configurations
│   │   └── main.jsx           # App entry point
│   ├── package.json
│   └── index.html
│
├── backend/                   # Node.js + Express API Backend
│   ├── controllers/           # HTTP Request Controllers
│   ├── routes/                # Router definitions
│   ├── middleware/            # JWT verification & CORS rules
│   ├── services/              # Business core logic executors
│   ├── config/                # Database and Env setups
│   ├── utils/                 # Helper utilities
│   ├── server.js              # Server entry point
│   └── package.json
│
├── database/
│   └── schema.sql             # MySQL DDL Schemas
│
├── .gitignore
└── README.md
```

---

## 🛠️ Getting Started & Launch Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer recommended)
- [npm](https://www.npmjs.com/) (v9.0 or newer)

---

### Phase 1 Setup & Running the Frontend

#### 1. Setup & Installation
Clone or navigate to the directory and run these commands to install the required packages:

```bash
# Shift to frontend directory
cd frontend

# Install Node modules
npm install
```

#### 2. Run Locally in Development Mode
To start the Vite dev server locally:

```bash
npm run dev
```

The app will compile and display a local workspace URL, typically:
`http://localhost:5173/`

---

## 🗺️ Available Routes

- `/login` &mdash; Centered credentials-auth card and illustrations.
- `/register` &mdash; Account setup details and organizer/participant selector.
- `/organizer/dashboard` &mdash; Placeholder panel for planned host controls.
- `/participant/dashboard` &mdash; Placeholder panel for planned attendee features.

---

## 📄 Implementation Status (Phase 1)

### ✅ What is Completed
1. **Visual Split-Screen Layouts:** Fully responsive side panel containing high-fidelity SVG/CSS dashboard preview mockups, ticket icons, and logos.
2. **Typography & Styling:** Configured Tailwind v4 theme mapping with standard Inter font.
3. **Responsive Flow:** Fluid breakpoint shifting collapsing into a single-column layout on tablet and mobile viewports.
4. **Validation:** Interactive validation feedback for credential inputs on login and signup fields.
5. **Interactive Controls:** Toggle password inputs and select Participant/Organizer roles.
6. **Navigation Linkages:** Seamless router transitions between Authentication forms.

### ⏳ Pending implementation (Future Phases)
- Integrated JWT authentication and MySQL queries.
- SQL DB container creation and tables linking.
- QR passcode scanner modules for registers.
- Certificates generation engine, email templates, and admin analytics dashboards.
