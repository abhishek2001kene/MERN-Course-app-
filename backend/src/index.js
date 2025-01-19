import connectDB from "./databace/index.js";   // Importing the function to connect to the database.
import dotenv from 'dotenv'                    // Importing the dotenv library to load environment variables from a `.env` file.
import { app } from "./app.js";                // Importing the Express app configuration from `app.js`.




dotenv.config({})              // Loading the environment variables from the `.env` file.


connectDB()                    // Calling the `connectDB` function to connect to MongoDB.
.then(() =>{
    app.listen(process.env.PORT) || 3000, () => {        // Start the Express server on the specified port (from `.env`) or default to 3000.
console.log(`server is running at port : ${process.env.PORT}`)
    }
})
.catch((err) => {                                          // If there’s an error connecting to the database:
    console.log("Mongodb connetion failure", err);
    
})


