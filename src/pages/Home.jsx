import { Link } from "react-router-dom";
import keycloak from "../services/keycloak";

export default function Home() {
  const isAuthenticated = keycloak.authenticated;
  // Check if the current user has the admin role from Keycloak
  const isAdmin = keycloak.realmAccess?.roles?.includes("admin");
  // Safely grab their first name for a personalized greeting
  const firstName = keycloak.tokenParsed?.given_name || "Alumni";

  // ==========================================
  // VIEW 1: Unauthenticated Landing Page
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
          🎓
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight flex flex-wrap items-center gap-4">
  Welcome to <span className="text-blue-600">JECRConnect</span>
  <span className="bg-emerald-100 text-emerald-800 text-2xl font-bold px-4 py-1 rounded-full border-2 border-emerald-400 shadow-md animate-pulse">
    v2.0 Live
  </span>
</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Your exclusive platform to connect with fellow alumni, find high-quality jobs, attend exclusive networking events, and mentor the next generation of students.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => keycloak.register()}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Join the Network
          </button>
          <button
            onClick={() => keycloak.login()}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: Authenticated User Dashboard
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore your alumni network. Here is everything you can do today.
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            📅
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Events & Mixers</h2>
          <p className="text-gray-600 mb-6 h-12">
            Discover upcoming alumni meetups, tech talks, and exclusive webinars.
          </p>
          <div className="flex gap-4">
            <Link to="/events" className="text-blue-600 font-medium hover:text-blue-800">Browse Events</Link>
            <span className="text-gray-300">|</span>
            <Link to="/events/create" className="text-blue-600 font-medium hover:text-blue-800">Host an Event</Link>
          </div>
        </div>

        {/* Card 2: Jobs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            💼
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Job Board</h2>
          <p className="text-gray-600 mb-6 h-12">
            Find your next career move or hire top talent from your alma mater.
          </p>
          <div className="flex gap-4">
            <Link to="/jobs" className="text-green-600 font-medium hover:text-green-800">Find Jobs</Link>
            <span className="text-gray-300">|</span>
            <Link to="/jobs/create" className="text-green-600 font-medium hover:text-green-800">Post a Job</Link>
          </div>
        </div>

        {/* Card 3: Mentorship */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4">
            🤝
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Mentorship</h2>
          <p className="text-gray-600 mb-6 h-12">
            Give back by guiding students, or find a mentor to level up your career.
          </p>
          <div className="flex gap-4">
            <Link to="/mentorship" className="text-purple-600 font-medium hover:text-purple-800">Find a Mentor</Link>
            <span className="text-gray-300">|</span>
            <Link to="/mentorship/create" className="text-purple-600 font-medium hover:text-purple-800">Become a Mentor</Link>
          </div>
        </div>

        {/* Card 4: Admin Panel (Only visible to Admins) */}
        {isAdmin && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Admin Control</h2>
            <p className="text-gray-400 mb-6 h-12">
              Review pending users, manage network settings, and oversee platform health.
            </p>
            <Link to="/admin" className="text-blue-400 font-medium hover:text-blue-300">
              Go to Dashboard →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}