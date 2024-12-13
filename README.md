# User Registration Endpoint

## Description

The `/user/register` endpoint is used to create a new user account. It accepts a JSON payload with the user's details and returns a JSON Web Token (JWT) upon successful registration.

## Request

### Method

* `POST`

### URL

* `/users/register`

### Request Body

The request body should contain the following fields:

* `fullname`: An object with `firstname` and `lastname` properties
* `email`: A string representing the user's email address
* `password`: A string representing the user's password

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}

User Profile Endpoint
Description
The /user/profile endpoint is used to retrieve the authenticated user's profile information.

Request
Method
GET
URL
/user/profile
Authentication
Requires a valid JWT token in the Authorization header.
Response
200 OK: Returns the user's profile data in JSON format.
401 Unauthorized: If the JWT token is invalid or missing.
Implementation
@user.service.js: Provides the getUserProfile method to retrieve the user's profile data.
@user.routes.js: Defines the /user/profile route and handles the GET request.
@user.model.js: Defines the User model and its schema.
@user.controller.js: Provides the getUserProfile method to handle the GET request and return the user's profile data.


Logout Endpoint
Description
The /users/logout endpoint is used to log out the authenticated user by invalidating their JWT token.

Request
Method
POST
URL
/users/logout
Authentication
Requires a valid JWT token in the Authorization header.
Response
200 OK: Returns a success message indicating the user has been logged out.
401 Unauthorized: If the JWT token is invalid or missing.
Implementation
@user.service.js: Provides the logoutUser method to invalidate the user's JWT token.
@user.routes.js: Defines the /users/logout route and handles the POST request.
@user.model.js: Defines the User model and its schema.
@user.controller.js: Provides the logoutUser method to handle the POST request and return a success message.