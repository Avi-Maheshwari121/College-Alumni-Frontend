import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./services/api";
import keycloak from "./services/keycloak";

// Components & Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventList from "./pages/Events/EventList";
import CreateEvent from "./pages/Events/CreateEvent";
import JobList from "./pages/Jobs/JobList";
import CreateJob from "./pages/Jobs/CreateJob";
import MentorshipList from "./pages/Mentorship/MentorshipList";
import BecomeMentor from "./pages/Mentorship/BecomeMentor";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Auth/Login";

// Our New Auth Flows
import CompleteProfile from "./pages/Auth/CompleteProfile";
import PendingApproval from "./pages/Auth/PendingApproval";

function App() {
  const [appState, setAppState] = useState({
    ready: false,
    dbUser: null,
    needsOnboarding: false,
  });

  useEffect(() => {
    if (keycloak.authenticated) {
      // Fetch the MongoDB profile to see if they exist and what their status is
      api.get("/auth/me")
        .then((res) => {
          setAppState({ ready: true, dbUser: res.data.data, needsOnboarding: false });
        })
        .catch((err) => {
          // If the backend says 401 or 404, it means they are new to the database!
          if (err.response?.status === 401 || err.response?.status === 404) {
            setAppState({ ready: true, dbUser: null, needsOnboarding: true });
          } else {
            setAppState({ ready: true, dbUser: null, needsOnboarding: false });
          }
        });
    } else {
      setAppState({ ready: true, dbUser: null, needsOnboarding: false });
    }
  }, []);

  // THE SMART ROUTER: Protects the application based on backend state
  const ProtectedRoute = ({ children, requireAdmin }) => {
    if (!keycloak.authenticated) {
      keycloak.login({ redirectUri: window.location.href });
      return null;
    }
    
    // Gate 1: If they aren't in the DB yet, force them to onboarding
    if (appState.needsOnboarding) return <Navigate to="/complete-profile" replace />;
    
    // Gate 2: If they are in the DB but pending (and NOT a Keycloak admin), force them to waiting room
    const isKeycloakAdmin = keycloak.realmAccess?.roles?.includes("admin");
    if (!isKeycloakAdmin && appState.dbUser?.status === "pending") {
      return <Navigate to="/pending-approval" replace />;
    }

    // Gate 3: Admin only routes
    if (requireAdmin && !isKeycloakAdmin) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  if (!appState.ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg font-medium">Loading Application...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            
            {/* The Onboarding & Pending Gates */}
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* Standard Protected Routes (Requires Approved Status) */}
            <Route path="/events" element={<ProtectedRoute><EventList /></ProtectedRoute>} />
            <Route path="/events/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
            <Route path="/jobs/create" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
            <Route path="/mentorship" element={<ProtectedRoute><MentorshipList /></ProtectedRoute>} />
            <Route path="/mentorship/create" element={<ProtectedRoute><BecomeMentor /></ProtectedRoute>} />

            {/* Admin Protected Route */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<div className="min-h-[70vh] flex items-center justify-center text-xl font-semibold text-gray-500">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} JECRConnect. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;