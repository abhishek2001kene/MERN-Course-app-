import React, { useContext, useState } from "react";           // React, useState and useContext hooks are imported for state management
import { Link, useNavigate } from "react-router-dom";          // 'Link' is used for navigation, and 'useNavigate' for programmatic navigation
import axios from "axios";                                     // Axios for making HTTP requests
import UserContext from "../Context/UserContext";             // Custom context to access and update user data



const SingninPage = () => {

  // Using useState to manage state for email, password, and message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");



  const navigate = useNavigate();
  const {setuser} = useContext(UserContext)     // Using context to get and set user data from the UserContex
 


  const handleLogin = async (e) => {
    e.preventDefault();                        // Preventing the default form submit behavior

    try {

      // Sending a POST request to the backend to authenticate the user

      const response = await axios.post("https://mern-course-app-1.onrender.com/api/v1/users/signin", {
        email,
        password,
      },
      { withCredentials: true });        // Allowing cookies and credentials to be sent with the request

     
      setMessage("Login successful!");
      setuser(response.data.data.user)   // Setting the user data in the context state after successful login
       

   
      
      navigate("/home");                // Redirecting the user to the home page after successful login
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full m-4 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Updating the email state when the input changes
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}     // Updating the password state when the input changes
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
           {/* Submit button */}
          <button
            type="submit"     
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>



{/* Link to navigate to the signup page */}
         <p>Creat an new account,  
          <Link
         className="text-blue-400"
         to="/signup">  Click here
          </Link></p>
        </form>


        {/* Displaying login status or error message */}
        {message && (
          <p className="text-center text-red-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SingninPage;
