import { Router } from "express";   // Importing the Router object from the Express
import { userLogin, userSignup } from "../controllers/user.controllers.js";       // Importing controller functions for handling User related operation User related operation

const router = Router()


router.route("/signup").post(userSignup)  // Define a POST route For creating new user
router.route("/signin").post(userLogin)  // Define a POST route To log in the user



export default router

