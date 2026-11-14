<h1 align="center">Neptun+ Frontend</h1>
<p align="center">
    A modern, scalable, and student-friendly university administration dashboard.
</p>

---

## 📖 About the Project

In its current phase, the system focuses on the Course Registration (Course Catalog) and Schedule Planning workflows.

## 🚀 Key Features

- Dynamic Sidebar: Collapsible, stateful navigation.
- Course Catalog: Browse, filter, and enroll in available courses.
- Visual Timetable: Calendar view to easily overview enrolled and drafted courses.
- Waitlist Management: Dedicated panel to track full courses.
- Responsive Design: Fully supported on both desktop and mobile devices.

## 🛠️ Tech Stack

- Framework: React
- Build Tool: Vite
- Routing: React Router DOM
- Icons: Lucide React
- Styling: Vanilla CSS

## ⚙️ Getting Started

To run this project locally, you will need Node.js installed on your machine. Follow these steps to start the development server:

1. Clone the repository:
    - git clone [https://github.com/Dlevy004/neptun-plus-frontend.git](https://github.com/Dlevy004/neptun-plus-frontend.git)

2. Navigate to the frontend directory:
    - cd neptun-plus-frontend/frontend

3. Install dependencies:
    - npm install

4. Start the development server:
    - npm run dev

The terminal will output your local address (usually http://localhost:5173). Open this in your browser to see the app running.

## 📡 API Endpoints
The following endpoints are available:

### Courses & Enrollment
- Course management requests are sent directly to the base URL defined in `VITE_API_BASE_URL` (default: `http://localhost:8000`).

- `GET /api/courses`: List available courses
- `GET /api/users/{userId}/enrollments`: Fetch enrolled course IDs for a user
- `POST /enroll`: Enroll in a course *(no `/api` prefix)*
- `POST /drop`: Drop a course *(no `/api` prefix)*

### Authentication
- Authentication requests use a relative `/api/accounts` prefix, which the `vite.config.js` dev server proxy forwards to the login service (rewriting `/api/accounts` → `/api`, defaulting to `http://localhost:8002`).
- **Token Handling:** The access token is sent via the `Authorization: Bearer <token>` header, while refresh tokens rely on `credentials: "include"` (HttpOnly cookie).

- `POST /api/accounts/login/`: Authenticate a user and return a JWT token.
- `POST /api/accounts/register/`: Register a new user account.
- `POST /api/accounts/logout/`: Log out the current user and invalidate the JWT token.
- `GET /api/accounts/me/`: Retrieve the profile information of the authenticated user.
- `POST /api/accounts/token/refresh/`: Refresh the access token using the refresh token stored in an HttpOnly cookie.

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

<h3 align="center">👨‍💻 Developer</h3>
<p align="center">Designed and Developed by Daróczi Levente</p>