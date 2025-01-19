import React, { useContext, useEffect } from "react";     // Import necessary React features like hooks
import axios from "axios";                                // Import axios for making HTTP requests
import {  useNavigate } from "react-router-dom";          // Import useNavigate to programmatically navigate between routes
import CourceContext from "../Context/CourceContext";     // Import CourseContext for course data
import { MdCurrencyRupee } from "react-icons/md";         // Import currency rupee icon for price display
import { GiOpenBook } from "react-icons/gi";              // Import book icon for course display

function Home() {

  //Extract values from UserContext (user) and CourceContext
  const { courcelist, setcourcelist, pending, setpending } =
    useContext(CourceContext);
  const navigate = useNavigate();   // Initialize navigate hook for route redirection

  const getCourceList = async () => {
    try {
      setpending(true);             // Set loading to true before making the request
      const responce = await axios.get(
        "https://mern-course-app-1.onrender.com/api/v1/cources/courcelist"
      );

      const result = responce.data;  // Get data from response

      setcourcelist(result?.data || []);   // Update the course list state with response data or empty array
    } catch (error) {
      console.error("Error fetching courses:", error);  // Log error if request fails
      setcourcelist([]);     // Set course list to empty array on error
    } finally {
      setpending(false);   // Set loading to false once the request is finished
    }
  };


  // useEffect hook to run the getCourceList function on initial render
  useEffect(() => {
    getCourceList();
  }, []);



  const handleDelete = async (currentId) => {
    try {
      const response = await axios.delete(
        `https://mern-course-app-1.onrender.com/api/v1/cources/delete/${currentId}`,
        {
          withCredentials: true,  // Include cookies in the request
        }
      );

      if (response.data?.message === "Course deleted successfully") {
        getCourceList(); // Refresh the course list after successful deletion
      } else {
        console.error("Delete failed:", response.data?.message);     // Log error if deletion fails
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };


  // Function to navigate to the 'AddCource' page with the current course data for editing
  const handleUpdate = (currentCource) => {
    navigate("/AddCource", { state: { currentCource } });   // Navigate to 'AddCource' and pass the course data
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100">
     
      <div className="md:pl-28 pl-12">
        <h1 className="md:text-4xl  mt-10 text-2xl  font-bold">Courses</h1>
        {pending ? (
          <h1>Loading...</h1>   // Show loading text while fetching data
        ) : courcelist && courcelist.length > 0 ? (    // If courses exist, map through them and display
          <div className="flex flex-wrap md:flex-row flex-col gap-10 mt-10 mr-20">
            {courcelist.map((c) => (             // Loop through the list of courses
              <div
              key={c._id} className="shadow-2xl rounded-b-xl border-black flex flex-col relative w-72 h-80">
                <div className="w-full bg-blue-600 flex justify-center items-center h-[50%]">
                  <GiOpenBook className="text-slate-300" size={130} />   {/* Display book icon */}
                </div>
                <div className="flex flex-col justify-between m-3 h-32">
                  <h1 className="text-lg font-bold overflow-hidden text-ellipsis ">
                    {c.courceName}
                  </h1>
                  <p className="mt-2 text-sm overflow-hidden text-ellipsis break-words line-clamp-2">
                    {c.courceDiscription}
                  </p>
                  <h1 className="mt-auto flex justify-end items-center font-semibold text-black">
                    <MdCurrencyRupee />  {/* Display currency icon */}
                    {c.courcePrice}
                  </h1>
                </div>
                <div className="flex m-2 justify-between">
                  <button
                    onClick={() => handleUpdate(c)}   // Edit button calls handleUpdate
                    className="bg-blue-600 text-white rounded-sm px-2 py-1 mb-1 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}   // Edit button calls handleUpdate
                    className="bg-blue-600 text-black rounded-sm px-2 py-1 mb-1 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="mt-10 font-semibold">No Courses Added</h3>  // Show message if no courses are available
        )}
      </div>
    </div>
  );
}

export default Home;
