import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "application", // Updated to match our local Keycloak setup
  clientId: "alumni-frontend"
});

export default keycloak;