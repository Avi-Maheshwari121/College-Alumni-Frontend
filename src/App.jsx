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
  });

  useEffect(() => {
    if (keycloak.authenticated) {
      // Fetch the MongoDB profile 
      api.get("/auth/me")
        .then((res) => {
          setAppState({ ready: true, dbUser: res.data.data });
        })
        .catch((err) => {
          console.error("Failed to fetch profile", err);
          setAppState({ ready: true, dbUser: null });
        });
    } else {
      setAppState({ ready: true, dbUser: null });
    }
  }, []);

  // THE SMART ROUTER: Strict 4-State Machine Implementation
  const ProtectedRoute = ({ children, requireAdmin }) => {
    if (!keycloak.authenticated) {
      keycloak.login({ redirectUri: window.location.origin });
      return null;
    }
    
    if (!appState.dbUser) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 font-medium">Error loading profile state. Please refresh.</div>
        </div>
      );
    }

    const isKeycloakAdmin = keycloak.realmAccess?.roles?.includes("admin");

    // Admin Bypass: Admins go straight through
    if (isKeycloakAdmin) {
      return children;
    }

    // Gate 1: Skeleton user, profile not completed -> Force to /complete-profile
    if (appState.dbUser.profileCompleted === false) {
      return <Navigate to="/complete-profile" replace />;
    }

    // Gate 2: Profile completed, but not yet verified -> Force to /pending-approval
    if (appState.dbUser.profileCompleted === true && appState.dbUser.status === "pending") {
      return <Navigate to="/pending-approval" replace />;
    }

    // Gate 3: Admin explicitly rejected the user -> Force to /rejected
    if (appState.dbUser.status === "rejected") {
      return <Navigate to="/rejected" replace />; 
    }

    // Gate 4: Admin route protection for normal users
    if (requireAdmin && !isKeycloakAdmin) {
      return <Navigate to="/" replace />;
    }

    // If approved and verified, grant access to the children components
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
            <Route path="/login" element={<Login />} />
            {/* NEW: Unwrapped Home route so it is publicly accessible without auto-login */}
            <Route path="/" element={<Home />} />

            {/* The Onboarding & Pending Gates (Must NOT be wrapped in ProtectedRoute) */}
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            
            <Route path="/rejected" element={
              <div className="min-h-[70vh] flex items-center justify-center flex-col text-center px-4">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Account Rejected</h1>
                <p className="text-gray-600">Your account was not approved by the admin team.</p>
              </div>
            } />

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