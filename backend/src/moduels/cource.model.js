import mongoose from "mongoose";

const courceSchema = new mongoose.Schema(             // Defining a schema for the "Cource" collection.
    {
    courceName : {
        type: String,
        required :true
    } ,
    courceDiscription : {
        type: String,
        required :true
      } ,
    courcePrice : {
        type: Number,
        required :true
    } ,
    },
{
    timestamps:true                                  // Adds `createdAt` and `updatedAt` timestamps automatically for each document
})




export const Cource = mongoose.model("Cource", courceSchema)     // Creates and exports a Mongoose model named "Cource" based on the `courceSchema`. 
