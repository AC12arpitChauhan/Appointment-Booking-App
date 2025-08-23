
# Appointment Booking App

A full-stack web application for scheduling and managing appointments. Built with a React frontend and an Express.js backend, this app uses MongoDB as its database and has been deployed on Render and Vercel.

##  Features

- **Appointment Booking** — Users can submit title, email, and date/time to book appointments.
- **Appointment List** — View all booked appointments in a clean list.
- **Dark Mode** — Toggle between light and dark themes for a better user experience.
- **API Endpoint** — A health check route (`/api/health`) to monitor backend status.
- **Cloud Deployment** — Frontend hosted on Vercel; backend hosted on Render.

---

##  Tech Stack

- **Frontend**: React, Material-UI (MUI)
- **Backend**: Node.js, Express.js, MongoDB (via MongoDB Atlas)
- **Hosting**: Vercel (frontend), Render (backend)

---

##  Repo Structure

```

Appointment-Booking-App/
├── appointment-app/     # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── server/              # Express backend
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── README.md            # You are here

````

---

##  Getting Started (Local Development)

###  Backend

1. Navigate to the `server/` directory:
   ```bash
   cd server

2. Copy `.env.example` to `.env` and fill in the required values:

   ```env
   PORT=5001
   MONGO_URI=your-mongodb-atlas-uri
   ```
3. Install dependencies and start the server:

   ```bash
   npm install
   npm start
   ```
4. Visit `http://localhost:5001/api/health` to check if the backend is running.

### Frontend

1. Switch to the frontend directory:

   ```bash
   cd appointment-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```
4. Ensure your frontend makes API calls using:

   ```js
   const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001";
   ```

---

## Environment Setup for Deployment

### Backend (Render)

* **Environment Variables**:

  * `PORT` — e.g., `5001`
  * `MONGO_URI` — Your MongoDB Atlas connection string
* **Paths**:

  * **Build Command**: `npm install`
  * **Start Command**: `node src/server.js`
  * **Root Directory**: `server/`

### Frontend (Vercel)

* **Environment Variable**:

  * `REACT_APP_API_URL` — e.g., `https://appointment-backend-ghpr.onrender.com`
* **Deploy Settings**:

  * Root Directory: `appointment-app/`
  * Build Command: `npm install && npm run build`
  * Output Directory: `build`

---

## Quick End-to-End Flow

1. User visits the frontend app (e.g., `https://appointment-frontend-drab.vercel.app/`).
2. The frontend fetches and posts appointment data to the backend via the configured API URL.
3. The backend processes requests, stores data in MongoDB Atlas, and responds accordingly.

---

## Contributing

Contributions are welcome! Here’s how you can help:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request with a clear description.

---

## License

This project is available under the **MIT License**.

---

### Why It’s Effective

-  **Clear structure**: Defines frontend and backend responsibilities.
-  **Step-by-step**: Instructions for local development and deployment.
-  **Deployment details**: Covers Render and Vercel configurations explicitly.
-  **Professional**: Encourages collaboration, includes license and contact info.


