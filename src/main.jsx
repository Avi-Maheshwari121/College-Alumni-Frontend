import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import keycloak from "./services/keycloak.js";

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

    console.log("Authenticated:", authenticated);

    /**
     * Auto refresh token before expiry
     */
    setInterval(() => {
      keycloak
        .updateToken(60)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed");
          }
        })
        .catch(() => {
          console.log("Session expired");

          keycloak.logout({
            redirectUri: window.location.origin,
          });
        });
    }, 30000);

    /**
     * Auth lifecycle listeners
     */
    // keycloak.onAuthLogout = () => {
    //   window.location.reload();
    // };

    // keycloak.onAuthSuccess = () => {
    //   console.log("Login success");
    // };

    // keycloak.onTokenExpired = () => {
    //   keycloak.updateToken(60);
    // };

    /**
     * Render App
     */
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error("Keycloak init failed:", error);

    root.render(
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600 text-lg font-medium">
        Failed to initialize authentication.
      </div>,
    );
  });
