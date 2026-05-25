# StayEase -- Hotel Booking Website

A full-stack hotel booking and management platform built with **React** (Vite) on the frontend and **Spring Boot** on the backend. The system supports three distinct user roles -- Customer, Admin, and Receptionist -- each with dedicated dashboards and capabilities.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Role-Based Access](#role-based-access)
- [Booking Lifecycle](#booking-lifecycle)

---

## Overview

StayEase is a hotel reservation management system that connects guests with hotels, enabling seamless room search, booking, and stay management. The platform provides:

- A **public-facing portal** for guests to browse hotels, search rooms, and make reservations.
- An **admin dashboard** for hotel owners to manage properties, rooms, staff accounts, and promotional offers.
- A **receptionist portal** for front-desk staff to handle daily arrivals, departures, check-ins, check-outs, room assignments, and booking modifications.

---

## Features

### Customer Features
- Browse all available hotels and view their details, facilities, and room listings.
- Search and filter rooms by location, price range, amenities, and date availability.
- Book rooms with automatic price calculation based on duration of stay.
- Apply promotional discount codes during booking.
- View complete booking history with status tracking.
- Quick rebook functionality to re-reserve a previously booked room with new dates.

### Admin Features
- Add new hotels with name, location, and facilities.
- Add rooms to hotels with category, price, amenities, and availability status.
- Toggle room availability status directly from the dashboard.
- View all hotels and expand to see their registered rooms.
- Create and manage receptionist accounts.
- Create and monitor promotional discount codes (percentage or flat amount) with expiry dates.
- View statistics dashboard showing total hotels, staff count, and active promotions.
- Oversee all bookings across the platform.

### Receptionist Features
- View daily arrivals (bookings scheduled for check-in today).
- View daily departures (bookings scheduled for check-out today).
- Monitor current room occupancy count.
- Perform guest check-in (transition from CONFIRMED/PENDING to CHECKED_IN).
- Perform guest check-out (transition from CHECKED_IN to CHECKED_OUT, auto-releases room).
- Cancel bookings (auto-releases room).
- Assign or reassign physical rooms to existing bookings.
- Modify booking dates with automatic price recalculation.
- Search bookings by reservation number.

### General Features
- JWT-based stateless authentication.
- Role-based access control (CUSTOMER, ADMIN, RECEPTIONIST).
- Protected routes on both frontend and backend.
- Email confirmation notifications on booking (console-based simulation).
- Swagger/OpenAPI documentation for all REST endpoints.
- Global exception handling with structured error responses.
- Responsive UI with TailwindCSS styling.

---

## Architecture

The application follows a **client-server architecture** with clear separation of concerns:

```
+------------------+         HTTP/REST         +-------------------+
|                  |  <--------------------->  |                   |
|   React Client   |       (JSON + JWT)        | Spring Boot Server|
|   (Vite + React) |                           |   (REST API)      |
|                  |                           |                   |
+------------------+                           +-------------------+
                                                       |
                                                       | JPA/Hibernate
                                                       v
                                               +-------------------+
                                               |   MySQL Database  |
                                               +-------------------+
```

**Frontend** (Port 5173) communicates with the **Backend** (Port 8080) via RESTful APIs. The backend uses Spring Security with JWT for authentication and Spring Data JPA for database operations.

---

## Tech Stack

### Frontend
| Technology        | Version | Purpose                          |
|-------------------|---------|----------------------------------|
| React             | 19.x    | UI component library             |
| Vite              | 8.x     | Build tool and dev server        |
| React Router DOM  | 7.x     | Client-side routing              |
| Axios             | 1.x     | HTTP client for API calls        |
| TailwindCSS       | 4.x     | Utility-first CSS framework      |
| React Icons       | 5.x     | Icon library                     |

### Backend
| Technology              | Version | Purpose                          |
|-------------------------|---------|----------------------------------|
| Java                    | 17      | Programming language             |
| Spring Boot             | 3.5.x   | Application framework            |
| Spring Security         | 6.x     | Authentication and authorization |
| Spring Data JPA         | 3.x     | Database ORM                     |
| MySQL                   | 8.x     | Relational database              |
| JJWT                    | 0.11.5  | JWT token generation/validation  |
| Lombok                  | latest  | Boilerplate code reduction       |
| SpringDoc OpenAPI       | 2.8.0   | Swagger API documentation        |
| Maven                   | 3.x     | Build and dependency management  |

---

## Project Structure

```
Final_project/
|
|-- client/                          # React frontend application
|   |-- index.html                   # HTML entry point
|   |-- package.json                 # NPM dependencies and scripts
|   |-- vite.config.js               # Vite build configuration
|   |-- src/
|   |   |-- main.jsx                 # React app entry point
|   |   |-- App.jsx                  # Root component
|   |   |-- index.css                # Global styles
|   |   |-- context/
|   |   |   |-- AuthContext.jsx      # Authentication state management
|   |   |-- routes/
|   |   |   |-- AppRoutes.jsx        # Route definitions and protection
|   |   |-- pages/
|   |   |   |-- Home.jsx             # Landing page
|   |   |   |-- Hotels.jsx           # Hotel listing page
|   |   |   |-- HotelDetails.jsx     # Individual hotel details and rooms
|   |   |   |-- Login.jsx            # User login page
|   |   |   |-- Register.jsx         # User registration page
|   |   |   |-- BookingHistory.jsx   # Customer booking history
|   |   |   |-- AdminDashboard.jsx   # Admin management dashboard
|   |   |   |-- ManageReceptionists.jsx  # Receptionist account management
|   |   |   |-- ReceptionPortal.jsx  # Receptionist operations portal
|   |   |-- components/
|   |   |   |-- Navbar.jsx           # Navigation bar with role-based menus
|   |   |   |-- ProtectedRoute.jsx   # Route guard by user role
|   |   |   |-- AddHotelForm.jsx     # Form to create a new hotel
|   |   |   |-- AddRoomForm.jsx      # Form to add rooms to a hotel
|   |   |   |-- BookingForm.jsx      # Room booking form with promo codes
|   |   |   |-- BookingList.jsx      # Booking list with management actions
|   |   |   |-- HotelList.jsx        # Reusable hotel card list
|   |   |   |-- SearchAndFilter.jsx  # Room search and filter controls
|   |   |   |-- PromotionForm.jsx    # Promotion creation form
|   |   |   |-- PromotionList.jsx    # Promotions display table
|   |   |   |-- AssignRoomModal.jsx  # Modal for room assignment
|   |   |   |-- EditDatesModal.jsx   # Modal for booking date changes
|   |   |   |-- RebookModal.jsx      # Modal for quick rebooking
|   |   |   |-- ReservationSearch.jsx  # Search by reservation number
|   |   |   |-- OccupancyCard.jsx    # Room occupancy statistics display
|   |   |-- services/
|   |       |-- api.js               # Axios instance with JWT interceptors
|   |       |-- bookingService.js    # Booking API functions
|   |       |-- hotelService.js      # Hotel and room API functions
|   |       |-- promotionService.js  # Promotion API functions
|   |       |-- receptionService.js  # Reception operations API functions
|   |       |-- userService.js       # User management API functions
|
|-- server/                          # Spring Boot backend application
|   |-- pom.xml                      # Maven project configuration
|   |-- src/main/java/com/hotel_booking/server/
|   |   |-- ServerApplication.java   # Spring Boot entry point
|   |   |-- config/
|   |   |   |-- SwaggerConfig.java   # OpenAPI/Swagger configuration
|   |   |-- controllers/
|   |   |   |-- AuthController.java       # Login and registration endpoints
|   |   |   |-- HotelController.java      # Hotel CRUD endpoints
|   |   |   |-- RoomController.java       # Room CRUD endpoints
|   |   |   |-- BookingController.java    # Customer booking endpoints
|   |   |   |-- AdminController.java      # Admin management endpoints
|   |   |   |-- ReceptionController.java  # Receptionist operations endpoints
|   |   |   |-- PromotionController.java  # Promotion management endpoints
|   |   |   |-- UserController.java       # User management endpoints
|   |   |-- models/
|   |   |   |-- entities/
|   |   |   |   |-- User.java        # User entity (implements UserDetails)
|   |   |   |   |-- Hotel.java       # Hotel entity
|   |   |   |   |-- Room.java        # Room entity
|   |   |   |   |-- Booking.java     # Booking entity
|   |   |   |   |-- Promotion.java   # Promotion entity
|   |   |   |-- enums/
|   |   |       |-- Role.java        # CUSTOMER, ADMIN, RECEPTIONIST
|   |   |       |-- BookingStatus.java  # PENDING, CONFIRMED, CANCELLED, CHECKED_IN, CHECKED_OUT
|   |   |-- dtos/
|   |   |   |-- ApiResponse.java          # Standardized API response wrapper
|   |   |   |-- AuthRequestDto.java       # Registration request
|   |   |   |-- AuthResponseDto.java      # Auth response with JWT token
|   |   |   |-- LoginRequestDto.java      # Login request
|   |   |   |-- BookingRequestDto.java    # Booking creation request
|   |   |   |-- BookingResponseDto.java   # Booking response with enriched data
|   |   |   |-- HotelRequestDto.java      # Hotel creation request
|   |   |   |-- RoomRequestDto.java       # Room creation request
|   |   |   |-- PromotionRequestDto.java  # Promotion creation request
|   |   |   |-- SearchRequestDto.java     # Room search filters
|   |   |-- repositories/
|   |   |   |-- UserRepository.java
|   |   |   |-- HotelRepository.java
|   |   |   |-- RoomRepository.java
|   |   |   |-- BookingRepository.java
|   |   |   |-- PromotionRepository.java
|   |   |-- services/
|   |   |   |-- BookingService.java       # Booking business logic
|   |   |   |-- HotelService.java         # Hotel and room search logic
|   |   |   |-- ReceptionService.java     # Reception desk operations
|   |   |   |-- EmailService.java         # Booking confirmation emails (console)
|   |   |-- security/
|   |   |   |-- SecurityConfig.java       # Spring Security and CORS config
|   |   |   |-- JwtService.java           # JWT generation and validation
|   |   |   |-- JwtAuthFilter.java        # JWT authentication filter
|   |   |   |-- CustomUserDetailsService.java  # User details loader
|   |   |-- exceptions/
|   |   |   |-- GlobalExceptionHandler.java
|   |   |   |-- InvalidBookingStatusTransitionException.java
|   |   |   |-- InvalidDateRangeException.java
|   |   |   |-- InvalidPromoCodeException.java
|   |   |   |-- RateLimitExceededException.java
|   |   |   |-- RoomUnavailableException.java
|   |   |   |-- UnauthorizedAccessException.java
|   |   |   |-- UserNotFoundException.java
|   |   |-- utils/
|   |       |-- StringListConverter.java  # JPA converter for list-to-string mapping
|   |-- src/main/resources/
|       |-- application.properties        # Database and JPA configuration
|
|-- DatabaseDiagram.pdf              # ER diagram documentation
|-- Hotel Booking Website - Problem Statement V2.pdf  # Requirements document
```

---

## Database Schema

The application uses five core tables in MySQL:

### Users
| Column       | Type         | Constraints                |
|--------------|--------------|----------------------------|
| id           | BIGINT       | PRIMARY KEY, AUTO_INCREMENT|
| name         | VARCHAR      |                            |
| email        | VARCHAR      | UNIQUE, NOT NULL           |
| password_hash| VARCHAR      | NOT NULL                   |
| role         | ENUM         | CUSTOMER, ADMIN, RECEPTIONIST |
| created_at   | DATETIME     | Auto-generated             |
| updated_at   | DATETIME     | Auto-updated               |

### Hotels
| Column       | Type         | Constraints                |
|--------------|--------------|----------------------------|
| id           | BIGINT       | PRIMARY KEY, AUTO_INCREMENT|
| name         | VARCHAR      | NOT NULL                   |
| location     | VARCHAR      | NOT NULL                   |
| facilities   | VARCHAR(1000)| Comma-separated list       |
| created_at   | DATETIME     | Auto-generated             |
| updated_at   | DATETIME     | Auto-updated               |

### Rooms
| Column       | Type         | Constraints                |
|--------------|--------------|----------------------------|
| id           | BIGINT       | PRIMARY KEY, AUTO_INCREMENT|
| hotel_id     | BIGINT       | NOT NULL (FK to Hotels)    |
| room_category| VARCHAR      | NOT NULL                   |
| price        | DOUBLE       | NOT NULL (per night)       |
| amenities    | VARCHAR(1000)| Comma-separated list       |
| is_available | BOOLEAN      | NOT NULL                   |
| created_at   | DATETIME     | Auto-generated             |
| updated_at   | DATETIME     | Auto-updated               |

### Bookings
| Column            | Type     | Constraints                    |
|-------------------|----------|--------------------------------|
| id                | BIGINT   | PRIMARY KEY, AUTO_INCREMENT    |
| user_id           | BIGINT   | NOT NULL (FK to Users)         |
| room_id           | BIGINT   | NOT NULL (FK to Rooms)         |
| reservation_number| VARCHAR  | UNIQUE, NOT NULL               |
| check_in_date     | DATE     | NOT NULL                       |
| check_out_date    | DATE     | NOT NULL                       |
| total_amount      | DOUBLE   | NOT NULL                       |
| status            | ENUM     | PENDING, CONFIRMED, CANCELLED, CHECKED_IN, CHECKED_OUT |
| created_at        | DATETIME | Auto-generated                 |
| updated_at        | DATETIME | Auto-updated                   |

### Promotions
| Column          | Type     | Constraints                |
|-----------------|----------|----------------------------|
| id              | BIGINT   | PRIMARY KEY, AUTO_INCREMENT|
| code            | VARCHAR  | UNIQUE, NOT NULL           |
| discount_amount | DOUBLE   | NOT NULL                   |
| type            | VARCHAR  | NOT NULL (e.g., loyalty, seasonal) |
| expiry_date     | DATE     | NOT NULL                   |
| created_at      | DATETIME | Auto-generated             |
| updated_at      | DATETIME | Auto-updated               |

---

## API Endpoints

All endpoints are prefixed with `/api`. Responses follow a standardized `ApiResponse` wrapper format:
```json
{
  "status": 200,
  "message": "Description of result",
  "data": { }
}
```

### Authentication (Public)
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login and receive JWT    |

### Hotels and Rooms (Public / Authenticated)
| Method | Endpoint                              | Access        | Description                          |
|--------|---------------------------------------|---------------|--------------------------------------|
| GET    | `/api/customer/hotels`                | Public        | List all hotels                      |
| GET    | `/api/customer/hotels/{id}/rooms`     | Authenticated | Get rooms for a specific hotel       |
| GET    | `/api/customer/hotels/search`         | Public        | Search rooms with filters            |
| GET    | `/api/customer/rooms`                 | Authenticated | List all rooms                       |
| GET    | `/api/customer/rooms/{id}`            | Authenticated | Get room details by ID               |

**Search Parameters** (query string):
- `location` -- Filter by hotel location (case-insensitive partial match)
- `minPrice` / `maxPrice` -- Price range filter
- `amenities` -- Filter by amenity keyword
- `checkInDate` / `checkOutDate` -- Date availability filter (ISO format: YYYY-MM-DD)

### Bookings (Customer)
| Method | Endpoint                                      | Description                     |
|--------|-----------------------------------------------|---------------------------------|
| POST   | `/api/customer/bookings`                      | Create a new booking            |
| GET    | `/api/customer/bookings/history`              | Get authenticated user's bookings |
| PUT    | `/api/customer/bookings/{id}/rebook`          | Quick rebook with new dates     |
| GET    | `/api/customer/bookings/promotions/validate`  | Validate a promo code           |

### Admin Operations
| Method | Endpoint                              | Description                           |
|--------|---------------------------------------|---------------------------------------|
| GET    | `/api/admin/bookings`                 | View all bookings (Admin + Receptionist) |
| POST   | `/api/admin/hotels`                   | Create a new hotel                    |
| POST   | `/api/admin/rooms`                    | Add a room to a hotel                 |
| PUT    | `/api/admin/rooms/{id}/availability`  | Toggle room availability (Admin + Receptionist) |
| POST   | `/api/admin/receptionists`            | Create a receptionist account         |
| GET    | `/api/admin/promotions`               | List all promotions                   |
| POST   | `/api/admin/promotions`               | Create a new promotion                |
| GET    | `/api/admin/users`                    | List all users                        |
| POST   | `/api/admin/users`                    | Create a new user account             |

### Reception Operations
| Method | Endpoint                              | Description                       |
|--------|---------------------------------------|-----------------------------------|
| GET    | `/api/reception/arrivals`             | Get daily arrivals (optional `date` param) |
| GET    | `/api/reception/departures`           | Get daily departures (optional `date` param) |
| GET    | `/api/reception/occupancy`            | Get current room occupancy count  |
| PUT    | `/api/reception/{id}/check-in`        | Check in a guest                  |
| PUT    | `/api/reception/{id}/check-out`       | Check out a guest                 |
| PUT    | `/api/reception/{id}/cancel`          | Cancel a booking                  |
| PUT    | `/api/reception/{id}/assign-room`     | Assign a room to a booking        |
| PUT    | `/api/reception/{id}/dates`           | Update booking dates              |

### Promotions (Customer)
| Method | Endpoint                                 | Description            |
|--------|------------------------------------------|------------------------|
| GET    | `/api/customer/promotions/validate`      | Validate a promo code  |

### API Documentation
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/swagger-ui.html`   | Swagger UI interface     |
| GET    | `/v3/api-docs`       | OpenAPI JSON spec        |

---

## Authentication and Authorization

### Authentication Flow
1. User registers via `/api/auth/register` or logs in via `/api/auth/login`.
2. Server validates credentials and returns a **JWT token** along with user details.
3. Client stores the token in `localStorage` and attaches it as a `Bearer` token in the `Authorization` header for subsequent requests.
4. The `JwtAuthFilter` intercepts every request, validates the token, and sets the Spring Security context.
5. On receiving a `401` response, the client auto-clears stored credentials and redirects to the login page.

### Security Rules
- **Public endpoints**: `/api/auth/**`, hotel listing, hotel search, Swagger docs.
- **Authenticated endpoints**: All `/api/customer/**` routes require a valid JWT.
- **Admin-only endpoints**: All `/api/admin/**` routes require the `ADMIN` authority.
- **Receptionist endpoints**: All `/api/reception/**` routes require the `RECEPTIONIST` authority.
- **Shared access**: `/api/admin/bookings/**` and room availability toggle are accessible to both `ADMIN` and `RECEPTIONIST` roles.
- **CSRF** is disabled (safe for stateless JWT-based authentication).
- **CORS** is configured to allow the frontend origin (`http://localhost:5173`).

### Frontend Route Protection
Routes are guarded by a `ProtectedRoute` component that checks:
- Whether the user is authenticated.
- Whether the user's role is included in the `allowedRoles` list for that route.

---

## Getting Started

### Prerequisites
- **Java 17** or later
- **Maven 3.6+**
- **Node.js 18+** and **npm**
- **MySQL 8.x** running locally on port 3306

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Configure the database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hotel_bookingdb?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```

3. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   On Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

4. The backend will start on `http://localhost:8080`. The database and tables will be auto-created by Hibernate (`ddl-auto=update`).

5. Access Swagger documentation at `http://localhost:8080/swagger-ui.html`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173`.

---

## Configuration

### Backend Configuration (`application.properties`)

| Property                          | Default Value                                        | Description                     |
|-----------------------------------|------------------------------------------------------|---------------------------------|
| `spring.datasource.url`          | `jdbc:mysql://localhost:3306/hotel_bookingdb?createDatabaseIfNotExist=true` | MySQL connection URL |
| `spring.datasource.username`     | `root`                                               | Database username               |
| `spring.datasource.password`     | *(set your password)*                                | Database password               |
| `spring.jpa.hibernate.ddl-auto`  | `update`                                             | Auto-create/update schema       |
| `spring.jpa.show-sql`            | `true`                                               | Log SQL statements to console   |

### Frontend Configuration

The API base URL is configured in `client/src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});
```

Update this value if deploying the backend to a different host or port.

---

## Role-Based Access

| Feature                     | Customer | Admin | Receptionist |
|-----------------------------|----------|-------|--------------|
| Browse hotels               | Yes      | Yes   | Yes          |
| Search/filter rooms         | Yes      | Yes   | Yes          |
| Book a room                 | Yes      | --    | --           |
| View booking history        | Yes      | --    | --           |
| Quick rebook                | Yes      | --    | --           |
| Apply promo codes           | Yes      | --    | --           |
| Add hotels                  | --       | Yes   | --           |
| Add rooms                   | --       | Yes   | --           |
| Toggle room availability    | --       | Yes   | Yes          |
| Manage receptionists        | --       | Yes   | --           |
| Create promotions           | --       | Yes   | --           |
| Oversee all bookings        | --       | Yes   | Yes          |
| Check-in / Check-out        | --       | --    | Yes          |
| Cancel bookings             | --       | --    | Yes          |
| Assign rooms to bookings    | --       | --    | Yes          |
| Modify booking dates        | --       | --    | Yes          |
| View arrivals/departures    | --       | --    | Yes          |
| Monitor room occupancy      | --       | --    | Yes          |

---

## Booking Lifecycle

A booking transitions through the following statuses:

```
  [Customer creates booking]
            |
            v
       CONFIRMED  -----(Receptionist cancels)-----> CANCELLED
            |
            | (Receptionist checks in)
            v
       CHECKED_IN  -----(Receptionist cancels)-----> CANCELLED
            |
            | (Receptionist checks out)
            v
       CHECKED_OUT
```

Key behaviors:
- New bookings are created with status `CONFIRMED`.
- Room availability is set to `false` when a booking is created.
- Room availability is restored to `true` when a booking is cancelled or checked out.
- Overlapping date ranges on the same room are validated and rejected.
- Price is automatically calculated as `number_of_nights * room_price_per_night`.
- Promotions with `discountAmount <= 1.0` are treated as a percentage; values above `1.0` are treated as a flat discount.

---
