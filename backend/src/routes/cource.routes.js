import { Router } from "express";          // Importing the Router object from the Express library

import { AddNewCource, deleteCource, getAllCources, updateCource } from "../controllers/cource.controllers.js";  // Importing controller functions for handling course-related operations


const router = Router()                            // Creating a new router instance for defining API endpoints

router.route("/courcelist").get(getAllCources)      // Define a GET route to fetch the list of all courses

router.route("/new-cource").post(AddNewCource)      // Define a POST route to add a new course

router.route("/update/:id").put(updateCource)      // Define a PUT route to update an existing course

router.route("/delete/:id").delete(deleteCource)   // Define a DELETE route to remove a course



export default router