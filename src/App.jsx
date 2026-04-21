import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import EventList from "./pages/Events/EventList";
import CreateEvent from "./pages/Events/CreateEvent";

import JobList from "./pages/Jobs/JobList";
import CreateJob from "./pages/Jobs/CreateJob";

import MentorshipList from "./pages/Mentorship/MentorshipList";
import BecomeMentor from "./pages/Mentorship/BecomeMentor";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import keycloak from "./services/keycloak";

function ProtectedRoute({ children }) {
  if (!keycloak.authenticated) {
    keycloak.login({
      redirectUri: window.location.href
    });

    return null;
  }

  return children;
}

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">

        {/* Navbar */}
        <Navbar />

        {/* Main */}
        <main className="flex-grow">

          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/mentorship" element={<MentorshipList />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/jobs/create"
              element={
                <ProtectedRoute>
                  <CreateJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/events/create"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mentorship/create"
              element={
                <ProtectedRoute>
                  <BecomeMentor />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-[70vh] flex items-center justify-center text-xl font-semibold text-gray-500">
                  404 - Page Not Found
                </div>
              }
            />

          </Routes>

        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} JECRConnect.
            All rights reserved.
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;