# FitCalorie Microservice Application

## Overview

FitCalorie is a modern, microservices-based application designed for fitness tracking and personalized activity recommendations. It allows users to manage their fitness activities, track their progress, and receive AI-driven suggestions for new activities. The project follows a distributed architecture, with separate services for handling users, activities, and AI-powered recommendations.

## Architecture

The application is built using a microservices architecture, orchestrated with Spring Cloud and Spring Boot. This design promotes separation of concerns, scalability, and resilience.

The key components of the backend architecture are:

*   **Service Discovery (Eureka):** A Eureka server acts as the central registry where all microservices register themselves. This allows services to discover and communicate with each other dynamically without hardcoding locations.

*   **Configuration Server (Spring Cloud Config):** A centralized configuration server provides configuration properties to all microservices. This approach allows for managing configuration for all services in a single place.

*   **API Gateway (Spring Cloud Gateway):** The API Gateway is the single entry point for all client requests. It routes requests to the appropriate downstream service and handles cross-cutting concerns like security. It secures the endpoints by validating JWTs, likely issued by an external identity provider.

*   **User Service:** This service is responsible for managing user-related data. It connects to a PostgreSQL database to persist user information.

*   **Activity Service:** This service manages fitness activities. It uses a MongoDB database for storing activity data and publishes messages to a RabbitMQ queue whenever a new activity is created.

*   **AI Service:** This service subscribes to the RabbitMQ queue to receive notifications about new activities. It then leverages an external AI service (Google Gemini) to generate personalized recommendations for the user. These recommendations are stored in its own MongoDB database.

### Frontend

The frontend of the FitCalorie application is a modern **React** single-page application (SPA) built with **Vite**. Its architecture is well-structured and follows common best practices.

*   **Component Structure:**
    *   The main entry point is `src/main.jsx`, which sets up the Redux store and authentication providers.
    *   The root component, `src/App.jsx`, acts as a router and authentication gatekeeper.
    *   If the user is not authenticated, it displays `src/LandingPage.jsx`, a large, static marketing page.
    *   If the user is authenticated, it displays the `AuthenticatedApp`, which contains the core application routes and components like `ActivityList.jsx`, `ActivityForm.jsx`, and `ActivityDetail.jsx`.

*   **State Management:** Global state is managed by **Redux Toolkit**. The store is configured in `src/store/store.js`. The primary state slice, `authSlice.js`, manages the user's token, profile data, and ID. This state is initialized from and persisted to `localStorage` to maintain the user's session across page reloads.

*   **API Integration:** All backend communication is centralized in `src/services/api.js`. A pre-configured `axios` instance points to the API Gateway at `http://localhost:8080/api`. A request interceptor automatically attaches the `Authorization: Bearer <token>` header to every outgoing request, simplifying authentication in the component logic.

### Authentication Flow

Authentication is handled by a third-party OpenID Connect provider (Keycloak, as configured in `src/authConfig.js`) using the secure OAuth 2.0 PKCE flow, facilitated by the `react-oauth2-code-pkce` library.

*   The `LandingPage` component initiates the login process by calling the `logIn()` function from the `AuthContext`.
*   After the user authenticates with Keycloak and is redirected back, the `App.jsx` component detects the token, dispatches the `setCredentials` action to update the Redux store, and renders the authenticated part of the application.
*   The logout process is handled by a `logOut()` function from the context and a corresponding `logout` action in Redux to clear the stored credentials.

## Technologies Used

### Backend

*   **Frameworks:** Spring Boot, Spring Cloud (Gateway, Config, Eureka)
*   **Databases:** PostgreSQL, MongoDB (demonstrating polyglot persistence)
*   **Messaging:** RabbitMQ for asynchronous, event-driven communication between services.
*   **Authentication:** OAuth2/JWT for securing the API endpoints.
*   **External APIs:** Google Gemini for AI-powered recommendations.
*   **Build Tool:** Maven

### Frontend

*   **Core:** React 19, Vite
*   **State Management:** Redux Toolkit (`@reduxjs/toolkit`)
*   **Routing:** `react-router`
*   **Styling:** Material-UI (`@mui/material`), Tailwind CSS, `lucide-react` for icons.
*   **API Communication:** `axios`
*   **Authentication:** `react-oauth2-code-pkce` for OAuth 2.0 PKCE flow with Keycloak.

## How to Run

To get this project up and running on your local machine, follow these steps:

### Prerequisites

*   **Java Development Kit (JDK) 17 or higher:** Required for Spring Boot applications.
*   **Maven:** Build tool for the backend services.
*   **Node.js and npm (or Yarn):** Required for the React frontend.
*   **Docker and Docker Compose:** Recommended for easily setting up databases (PostgreSQL, MongoDB), RabbitMQ, and Keycloak.
*   **PostgreSQL:** Database for the User Service.
*   **MongoDB:** Database for the Activity and AI Services.
*   **RabbitMQ:** Message broker for inter-service communication.
*   **Keycloak:** Identity and Access Management for authentication.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd FitCalorie-MicroServiceApp
    ```

2.  **Database and Messaging Setup (using Docker Compose - Recommended):**
    Navigate to the `BackEnd-Part` directory and create a `docker-compose.yml` file (if not already present) to set up PostgreSQL, MongoDB, RabbitMQ, and Keycloak.
    *(Note: You will need to create this `docker-compose.yml` file based on your specific configurations for these services. Ensure the ports and credentials match those expected by your Spring Boot applications and frontend `authConfig.js`.)*

    Example `docker-compose.yml` (This is a generic example, adjust as needed):
    ```yaml
    version: '3.8'
    services:
      postgresql:
        image: postgres:13
        environment:
          POSTGRES_DB: usersdb
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
        ports:
          - "5432:5432"
        volumes:
          - postgres_data:/var/lib/postgresql/data

      mongodb:
        image: mongo:latest
        ports:
          - "27017:27017"
        volumes:
          - mongo_data:/data/db

      rabbitmq:
        image: rabbitmq:3-management
        ports:
          - "5672:5672"
          - "15672:15672" # Management UI
        environment:
          RABBITMQ_DEFAULT_USER: guest
          RABBITMQ_DEFAULT_PASS: guest

      keycloak:
        image: quay.io/keycloak/keycloak:20.0.0
        command: start-dev
        environment:
          KEYCLOAK_ADMIN: admin
          KEYCLOAK_ADMIN_PASSWORD: admin
          KC_DB: postgres
          KC_DB_URL: jdbc:postgresql://postgresql:5432/keycloak
          KC_DB_USERNAME: keycloak
          KC_DB_PASSWORD: password
          KC_HOSTNAME_URL: http://localhost:8080 # Or your actual frontend URL
        ports:
          - "8080:8080" # Keycloak admin console and auth server
        depends_on:
          - postgresql
        volumes:
          - keycloak_data:/opt/keycloak/data

    volumes:
      postgres_data:
      mongo_data:
      keycloak_data:
    ```
    Start the services:
    ```bash
    docker-compose up -d
    ```
    Configure Keycloak: You will need to log into the Keycloak admin console (usually `http://localhost:8080/admin`) and set up a realm, client, and users that match the configuration in `FrontEnd Part/src/authConfig.js`.

### Running the Backend Services

Navigate to the `BackEnd-Part` directory. Each microservice (e.g., `configserver`, `eureka`, `gateway`, `userservice`, `activityservice`, `aiservice`) is a separate Maven project.

1.  **Build all services:**
    ```bash
    mvn clean install
    ```

2.  **Run each service individually (in separate terminal windows):**
    Start services in the following order:
    *   **Config Server:**
        ```bash
        cd configserver
        mvn spring-boot:run
        ```
    *   **Eureka Server:**
        ```bash
        cd eureka
        mvn spring-boot:run
        ```
    *   **API Gateway:**
        ```bash
        cd gateway
        mvn spring-boot:run
        ```
    *   **User Service:**
        ```bash
        cd userservice
        mvn spring-boot:run
        ```
    *   **Activity Service:**
        ```bash
        cd activityservice
        mvn spring-boot:run
        ```
    *   **AI Service:**
        ```bash
        cd aiservice
        mvn spring-boot:run
        ```

### Running the Frontend Application

Navigate to the `FrontEnd Part` directory.

1.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```

The frontend application should now be running, typically accessible at `http://localhost:5173` (or another port indicated by Vite).

## API Endpoints

*(You can add a section here detailing key API endpoints and their functionalities once the project is fully operational.)*


