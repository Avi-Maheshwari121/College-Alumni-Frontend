# JECRConnect - College Alumni Portal (Frontend)

This repository contains the frontend application for the JECRConnect college alumni portal, designed specifically as a containerized workload for our internal on-premise infrastructure. It bridges the gap between current students and alumni by providing a platform to discover career opportunities, attend networking events, and find mentors to guide professional journeys.

## Tech Stack

* **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing:** React Router v7
* **Styling:** Tailwind CSS
* **Authentication:** Keycloak (OIDC/OAuth2)
* **API Client:** Axios
* **Containerization & Orchestration:** Docker, Kubernetes
* **CI/CD:** Jenkins

## Features

* **Secure Authentication:** User login and registration powered by Keycloak SSO.
* **Campus Events:** Browse and host alumni events, reunions, and tech talks.
* **Job Board:** Explore job openings and referrals posted directly by alumni. Create new job postings.
* **Mentorship Program:** Connect with experienced graduates for career advice or volunteer to become a mentor.
* **Responsive Design:** Fully responsive UI built with Tailwind CSS.

## Prerequisites

Before running the application locally, ensure you have the following installed:

* Node.js (v18 or higher recommended)
* npm or yarn
* A running Keycloak instance configured with the `Alumni-Portal-External` realm.
* A running backend API service.

## Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Avi-Maheshwari121/College-Alumni-Frontend.git](https://github.com/Avi-Maheshwari121/College-Alumni-Frontend.git)
    cd College-Alumni-Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and configure the backend API URL. By default, it falls back to `http://localhost:30018/api/v1`.
    ```env
    VITE_API_URL=http://your-backend-url/api/v1
    ```
    *Note: Update `src/services/keycloak.js` with your Keycloak realm, client ID, and URL if they differ from the defaults.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## On-Premise Deployment

This workload is actively deployed and managed within our internal infrastructure. 

**Target Environment:**
* **Cluster:** Rancher-managed RKE2 
* **Infrastructure:** Bare-metal ProLiant servers

**Deployment Steps:**
You can deploy the application to the cluster using the provided manifest file (`frontend.yml`).

```bash
kubectl apply -f frontend.yml