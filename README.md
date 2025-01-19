MERN Stack Application - 
Course Management

This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It implements a simple course management system with the following features:

User Authentication (Register, Login)
Courses CRUD Operations (Create, Read, Edit, Delete)
The application allows users to register, log in, and perform CRUD operations on courses. The backend is powered by Node.js with Express, MongoDB is used for data storage, and the frontend is built with React.

Features
1. User Authentication
Register: Allows new users to register by providing their name, email, and password.
Validation: Ensures the email is unique, and the password is hashed before saving.
Login: Allows existing users to log in using their email and password.
JWT Token: Returns a JWT token if the login is successful.
2. Courses CRUD Operations
Create: Endpoint to create a new course.

Fields: Course Name, Description, Prize.
Read: Fetch all courses or a specific course by its ID.

Edit: Update the details of a course.

Delete: Delete a course.

Run the Backend
To run the backend:

bash
Copy
Edit
npm run dev
API Endpoints
1. Authentication
POST /api/v1/users/signup: Register a new user.

Request Body: { "name": "John Doe", "email": "johndoe@example.com", "password": "Password123" }
POST /api/v1/users/signin: Log in an existing user.

Request Body: { "email": "johndoe@example.com", "password": "password123" }
Response: { "token": "your_jwt_token" }
2. Courses
POST /api/v1/courses/new-course: Create a new course.

Request Body: { "name": "React for Beginners", "description": "Learn React", "prize": "John Smith" }
GET /api/v1/courses/course-list: Fetch all courses.

PUT /api/v1/courses/update/:id: Edit an existing course.

Request Body: { "name": "Updated React Course", "description": "Updated course description", "prize": "J" }
DELETE /api/v1/courses/delete/:id: Delete a course.

Validation & Error Handling
Email validation is implemented during registration to ensure the email is unique.
Passwords are hashed using bcrypt before saving them to the database.
Proper error handling is included in all API routes with meaningful error messages and status codes.
Notes
JWT tokens are used for authentication. Include the token in the Authorization header for protected routes.
The frontend communicates with the backend using Axios for API requests.
The application is fully responsive and works well on both desktop and mobile devices.
Technologies Used
Backend: Node.js, Express, MongoDB, JWT, bcrypt
Frontend: React, Axios, Vite (for faster builds)
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Running the Project
To run both the backend and frontend together, use the following command in the root directory of the project:

bash
Copy
Edit
npm run dev
This project demonstrates a simple course management system using the MERN stack with proper validation, authentication, and CRUD operations.
