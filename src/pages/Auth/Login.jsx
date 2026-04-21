import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import keycloak from "../../services/keycloak";

export default function Login() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    if (keycloak.authenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    keycloak.login();
  };

  const handleRegister = () => {
    keycloak.register();
  };

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:5173/login"
    });
  };

  if (!ready) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 text-white rounded"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="w-full py-3 border border-blue-600 text-blue-600 rounded"
          >
            Register
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded"
          >
            Logout Existing Session
          </button>

        </div>
      </div>
    </div>
  );
}