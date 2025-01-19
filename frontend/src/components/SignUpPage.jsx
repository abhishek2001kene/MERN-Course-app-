import React, { useState } from "react";                  // Importing React and useState hook from React library
import { Link, useNavigate } from "react-router-dom";     // Importing Link and useNavigate for routing
import axios from "axios";                                // Importing axios for making HTTP requests

function SignUpPage() {

  // Declaring state variables to hold form data and messages
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});


  const navigate = useNavigate(); // Hook to navigate between pages




  const validateInputs = () => {
    const newErrors = {};         // To hold any errors that occur during validation


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;       // Regular expression for valid email format


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;      // Regex for password with at least one uppercase, one lowercase, and one digit

    if (!emailRegex.test(email)) {    // If the password doesn't match the regex
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = `Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.`;
    }
    return newErrors;   // Return any validation errors
  };




  const handleSignUp = async (e) => {
    e.preventDefault();                                 // Prevent the default form submission
    const validationErrors = validateInputs();            // Validate the inputs
    if (Object.keys(validationErrors).length > 0) {        // If there are validation errors, Set errors to show them on the form
      setErrors(validationErrors);
      return;
    }

    try {
      // Make POST request to the server to sign up the user
      const response = await axios.post(
        "https://mern-course-app-1.onrender.com/api/v1/users/signup",   
        { fullName, email, password }
      );
      setMessage(response.data.message);


      // Store tokens in localStorage 
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      navigate("/");    //Redirect to homepage after successful signin
    } catch (error) {
      setMessage(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full m-4 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Registration
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="FullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}       // Updating state value on input change
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}      // Updating email value
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}    // Updating password value
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Displaying error message if password is invalid */}
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>


          {/* Submit button */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            Submit
          </button>


          {/* Link to login page if user already has an account */}
          <p>
            Already have an account?{" "}
            <Link className="text-blue-400" to="/">
              Click here to login
            </Link>
          </p>
        </form>

        {/* Displaying success or error message */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default SignUpPage;
