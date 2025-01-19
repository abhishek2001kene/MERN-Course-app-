import { apiError } from "../utils/apiError.js";
import { apiResponce } from "../utils/apiResponce.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { Cource } from "../moduels/cource.model.js";

const getAllCources = asynHandler(async (req, res) => {
  try {
    const CourceList = await Cource.find();   // Fetch all courses from the database

    if (!CourceList || CourceList.length === 0) {          // Check if no courses exist
      return res.status(404).json(new apiResponce(404, {}, "No courses found"));
    }

    return res                              // Return courses if found
      .status(200)
      .json(new apiResponce(200, CourceList, "Courses fetched successfully"));
  } catch (error) {
    console.error("Error fetching courses:", error);

    return res                              // Return a generic error message
      .status(500)
      .json(
        new apiResponce(500, {}, "An error occurred while fetching courses")
      );
  }
});





const AddNewCource = asynHandler(async (req, res) => {
  const { courceName, courceDiscription, courcePrice } = req.body;           // Destructure the course details from request body

  if (!courceName || !courceDiscription || !courcePrice)                     // Throw an error if any field is missing
     {             
    throw new apiError(400, "All fields are required.");
  }

  const newCource = await Cource.create({     // Create a new course document in the database
    courceName,
    courceDiscription,
    courcePrice,
  });

  if (!newCource) {                         // Handle database creation failure
    throw new apiError(500, "Something went wrong while creating Cource.");
  }

  return res                                  // Return the created course
    .status(201)
    .json(new apiResponce(201, newCource, "New Cource Created successfully"));
});




const deleteCource = asynHandler(async (req, res) => {
  const id = req.params.id;                                                       // Get the course ID from the request parameters

  try {
    const findCource = await Cource.findByIdAndDelete(id);                        // Find and delete the course by ID

    if (!findCource) {                      
      throw new apiError(401, "Course not found");
    }

    return res
      .status(200)
      .json(new apiResponce(200, {}, "Course deleted successfully"));
  } catch (error) {
    console.log(error);

    return res.status(500).json(new apiResponce(500, {}, "Unable to delete."));      // Handle server errors
  }
});




const updateCource = asynHandler(async (req, res) => {
  const id = req.params.id;                                             // Get the course ID from request parameters

  const { courceName, courceDiscription, courcePrice } = req.body;      // Destructure updated course details from request body

  try {                                                                 // Find course by ID
    const currentCourceUpdate = await Cource.findByIdAndUpdate(      
      id,
      {
        courceName,
        courceDiscription,
        courcePrice,
      },
      {
        new: true,                         // Return the updated document
      }
    );

    if (!currentCourceUpdate) {
      throw new apiError(404, "Course not found");         // Handle case where course does not exist
    }

    return res                          // Return the updated course
      .status(201)
      .json(
        new apiResponce(201, currentCourceUpdate, "Cource updated successfully")
      );
  } catch (error) {
    console.log(error);
    return res.status(501).json(new apiResponce(501, {}, "unable to update"));
  }
});





export { getAllCources, AddNewCource, deleteCource, updateCource };
