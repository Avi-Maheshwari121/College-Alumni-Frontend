import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import keycloak from "./services/keycloak.js";
import api from "./services/api.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Loading Screen
 */
root.render(
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-lg font-medium text-gray-600">
      Initializing Application...
    </div>
  </div>,
);

/**
 * Keycloak Init
 */
keycloak
  .init({
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  })
  .then((authenticated) => {
    /**
     * Global debug access
     */
    window.keycloak = keycloak;

    // if (authenticated) {
    //   api
    //     .get("/auth/me")
    //     .then((res) => {
    //       console.log("Mongo user synced:", res.data);
    //     })
    //     .catch((err) => {
    //       console.error("Sync failed:", err);
    //     });
    // }

    console.log("Authenticated:", authenticated);

  // 1. Check if the user has the admin role in Keycloak
  const isAdmin = keycloak.realmAccess?.roles?.includes("admin");

  // 2. Build the config WITH the user's context
  const unleashConfig = {
    url: 'http://localhost:4242/api/frontend',
    clientKey: '*:development.0ef750b9b74b97fb2de47d726a48c6e354db72e764bc37421f255660', // Keep your working token!
    refreshInterval: 5,
    appName: 'alumni-frontend',
    context: {
      userId: keycloak.tokenParsed?.sub || 'anonymous',
      sessionId: keycloak.sessionId || 'anonymous',
      
      // This is the magic bridge! It tells Unleash the user's role.
      properties: {
        role: isAdmin ? 'admin' : 'student' 
      }

    }
  };

  // THEN render the App, completely wrapped in the FlagProvider
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <FlagProvider config={unleashConfig}>
        <App />
      </FlagProvider>
    </React.StrictMode>
  );
}).catch((err) => {
  console.error("Keycloak init failed:", err);
});