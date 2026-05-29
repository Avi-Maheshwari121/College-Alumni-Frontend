import Keycloak from "keycloak-js";

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || `${window.location.origin}/auth`;
//when testing on local computer inject this VITE_KEYCLOAK_URL in the .env file to make it work on the local machine and when trying to work on the kubenetes setup use window.location.origin

const keycloak = new Keycloak({
  url: keycloakUrl,
  realm: "application", 
  clientId: "alumni-frontend"
});

export default keycloak;