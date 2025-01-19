import mongoose from "mongoose";       // Importing the Mongoose library for interacting with MongoDB.
import {DB_Name} from "../constants.js"   // Importing the database name constant from a file.


const connectDB = async () => {
    try {          //connection to MongoDB using Mongoose.
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        console.log(`MongoDB Connected !!! DB Host : ${connectionInstance.connection.host}`)   // Logging a success message, including the database host information from the connection instance.


    } catch (error) {                                     // Logging an error message if the connection fails.
        console.log("MongoDB Connection Error", error)
        process.exit(1)                                  // Exiting the process with a non-zero status code to indicate an error.
    }
}
export default connectDB


