import axios from "axios";
import keycloak from "./keycloak";

/**
 * Production Ready Axios Client
 */

const api = axios.create({
  // Change from hardcoded URL to a relative path
  // /when testing on local computer inject this VITE_KEYCLOAK_URL in the .env file to make it work on the local machine like VITE_API_URL = localhost:8000/api/v1 tpyes..
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request Interceptor
 * Attach fresh access token
 */

api.interceptors.request.use(
  async (config) => {
    try {
      if (
        keycloak?.authenticated
      ) {
        /**
         * Refresh token
         * if expiring soon
         */
        await keycloak.updateToken(
          30
        );

        config.headers.Authorization =
          `Bearer ${keycloak.token}`;
      }

      return config;
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

      /**
       * Force login again
       */
      keycloak.login();

      return Promise.reject(
        error
      );
    }
  },
  (error) =>
    Promise.reject(error)
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) =>
    response,

  async (error) => {
    const status =
      error.response?.status;

    /**
     * Unauthorized
     */
   /**
     * Unauthorized
     */
    if (status === 401) {
      // Do NOT trigger a login loop if the request was checking the user profile
      const isAuthMeRequest = error.config && error.config.url && error.config.url.includes('/auth/me');
      
      if (!isAuthMeRequest) {
        try {
          await keycloak.login();
        } catch (err) {
          console.error("Re-login failed");
        }
      } else {
        console.warn("User authenticated in Keycloak, but not found in backend DB.");
      }
    }

    /**
     * Forbidden
     */
    if (status === 403) {
      console.warn(
        "Forbidden request"
      );
    }

    /**
     * Server Error
     */
    if (status >= 500) {
      console.error(
        "Server error"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;