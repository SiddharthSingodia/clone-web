# UBER Clone Backend API

## Overview
This is the backend API for an UBER clone application. It provides various endpoints for user management, ride booking, captain (driver) management, and other essential features of a ride-hailing service.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation
1. Clone the repository
```bash
git clone <repository-url>
cd UBER/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Start the server
```bash
npm start
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## API Documentation

### User Endpoints

#### 1. User Registration
- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Description:** Create a new user account
- **Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:** Returns JWT token upon successful registration

#### 2. User Profile
- **Endpoint:** `/user/profile`
- **Method:** `GET`
- **Description:** Retrieve authenticated user's profile
- **Authentication:** Required (JWT Token)
- **Response:** User profile data

### Captain Endpoints

#### 1. Captain Registration
- **Endpoint:** `/captain/register`
- **Method:** `POST`
- **Description:** Register a new captain (driver) in the system
- **Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "car | motorcycle | auto"
  }
}
```
- **Validation Rules:**
  - Email must be a valid email address
  - First name must be at least 3 characters long
  - Password must be at least 6 characters long
  - Vehicle color must be at least 3 characters long
  - Vehicle plate must be at least 3 characters long
  - Vehicle capacity must be a number
  - Vehicle type must be one of: car, motorcycle, auto

#### 2. Captain Login
- **Endpoint:** `/captain/login`
- **Method:** `POST`
- **Description:** Authenticate a captain and receive a JWT token
- **Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Validation Rules:**
  - Email must be a valid email address
  - Password must be at least 6 characters long
- **Response:** Returns JWT token upon successful login

#### 3. Captain Profile
- **Endpoint:** `/captain/profile`
- **Method:** `GET`
- **Description:** Retrieve authenticated captain's profile
- **Authentication:** Required (JWT Token)
- **Response:** Captain profile data

#### 4. Captain Logout
- **Endpoint:** `/captain/logout`
- **Method:** `GET`
- **Description:** Logout the captain and invalidate the JWT token
- **Authentication:** Required (JWT Token)
- **Response:** Success message upon logout

## Database Schema

### User Model
- fullname (Object)
  - firstname (String)
  - lastname (String)
- email (String, unique)
- password (String, hashed)
- createdAt (Date)

### Captain Model
- Basic profile information
- Vehicle details
- Current status
- Rating

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License.
