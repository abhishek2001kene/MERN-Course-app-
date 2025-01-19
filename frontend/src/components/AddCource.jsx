import React, { useContext, useState, useEffect } from "react";
import {  useNavigate, useLocation } from "react-router-dom";    // Import routing functions for navigation
import CourceContext from "../Context/CourceContext";            // Import the context for handling course state
import axios from "axios";                                       // Import Axios for making HTTP requests

function AddCource() {

  // Declare state variables for handling form input and messages
  const [courceName, setcourceName] = useState("");
  const [courceDiscription, setcourceDiscription] = useState("");
  const [courcePrice, setcourcePrice] = useState("");
  const [message, setmessage] = useState("");



  // Use Context to get 'isEdit' and 'setisEdit' for determining whether it's editing or adding a new course
  const { isEdit, setisEdit } = useContext(CourceContext);


  // Initialize navigation and location hooks for routing and accessing route state
  const navigate = useNavigate();
  const location = useLocation();



   // useEffect hook to handle side effects based on the route's location and whether it's editing an existing course
  useEffect(() => {
    if (location.state && location.state.currentCource) {
      const { courceName, courceDiscription, courcePrice } = location.state.currentCource;
      setisEdit(true); // Set 'isEdit' to true to indicate that the user is editing a course
      setcourceName(courceName || "");
      setcourceDiscription(courceDiscription || "");
      setcourcePrice(courcePrice || "");
    } else {
      setisEdit(false);   // Set 'isEdit' to false if not editing
      setcourceName("");
      setcourceDiscription("");
      setcourcePrice("");
    }
  }, [location]);             // Run this effect when location changes 


// Function to handle form submission (adding or editing a course)
  const handleCource = async (e) => {
    e.preventDefault();       // Prevent default form submission behavior
    try {

      // Make an HTTP request based on whether the user is editing or adding a new course
      const response = isEdit
        ? await axios.put(
            `http://localhost:3000/api/v1/cources/update/${location.state.currentCource._id}`,
            { courceName, courceDiscription, courcePrice }
          )
        : await axios.post(
            "http://localhost:3000/api/v1/cources/new-cource",
            { courceName, courceDiscription, courcePrice }
          );
      setmessage(response.data.message);     // Set success message from the response
      setTimeout(() => {                     // Clear the message after 1.5 seconds
        setmessage("");
        navigate("/home");                   // Redirect user to the home page
      }, 1500);
    } catch (error) {
      setmessage(error.response?.data?.message || "Error in processing course data");
    }
  };

  return (
    <div className=" flex flex-col  items-center justify-center ">

      <div className="bg-white mt-10 shadow-2xl border rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isEdit ? "Edit Course" : "Add New Course"}            {/*Show title based on edit status*/}
        </h1>
        <form onSubmit={handleCource} className="space-y-4">     {/*Handle form submission*/}

          {/*Input fields for course name, description, and price */}
          <input
            type="text"
            placeholder="Course Name"
            value={courceName}     
            onChange={(e) => setcourceName(e.target.value)}         //Update course name state on change
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Course Description"
            value={courceDiscription}
            onChange={(e) => setcourceDiscription(e.target.value)}   // Update course description state
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
          />
          <input
            type="number"
            placeholder="Course Price"
            value={courcePrice}
            onChange={(e) => setcourcePrice(e.target.value)}         // Update course price state
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isEdit ? "Update Course" : "Add Course"}                {/*Button label based on edit status*/}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>  //Show success or error message 
        )}
      </div>
    </div>
  );
}

export default AddCource;
