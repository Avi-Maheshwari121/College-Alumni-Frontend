import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import keycloak from "../services/keycloak";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!keycloak.authenticated);

    if (keycloak.authenticated) {
      setUserName(
        keycloak.tokenParsed?.given_name ||
        keycloak.tokenParsed?.preferred_username ||
        "User"
      );
    }
  }, []);

  const handleLogin = () => {
    keycloak.login({
      redirectUri: "http://localhost:5173/"
    });
  };

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:5173/"
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">

          {/* Left */}
          <div className="flex">

            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-blue-600"
              >
                JECRConnect
              </Link>
            </div>

            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">

              <Link
                to="/events"
                className="text-gray-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Events
              </Link>

              <Link
                to="/jobs"
                className="text-gray-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Jobs
              </Link>

              <Link
                to="/mentorship"
                className="text-gray-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Mentorship
              </Link>

            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {isLoggedIn ? (
              <>
                <span className="hidden sm:block text-sm text-gray-600">
                  Hi, {userName}
                </span>

                {/* <Link
                  to="/jobs/create"
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100"
                >
                  Post Job
                </Link> */}

                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100"
              >
                Sign In
              </button>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}