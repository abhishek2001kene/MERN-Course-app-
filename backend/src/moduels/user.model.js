import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema(            // Defining a schema for the "User" collection.
    {
        fullName : {
            type:String,
            required: true
        },
        email : {
            type:String,
            required: true,
            lowercase:true,
            unique:true
        },
        password : {
            type:String,
            required: true
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps:true
    }
)





// Before saving the user document, this middleware runs
userSchema.pre('save', async function (next) {          
    if (!this.isModified("password")) return next()            // Skip if password is not modified        


        this.password = await bcrypt.hash(this.password, 10)   // If password is modified, hash it using bcrypt with a salt round of 10
    
        next()
})





// Method to compare the provided password with the stored (hashed) password
userSchema.methods.isPasswordcorrect = async function (password) {

    return await bcrypt.compare(password  ,this.password)
    
};




// Method to generate an access token for the user

userSchema.methods.generateAccessToken = function () {                // Create a JWT token with the user’s ID, email, and fullName
    return jwt.sign(
        {
            _id : this._id,
            email:this.email,
            fullName:this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,                               // Secret key to sign the token 
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY                  
        }
    )
}



// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(                                                 // Add user ID to the refresh token payload
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,                            // Secret key to sign the refresh token
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY              // Set the expiration time of the refresh token
        }
    )
}


export const User = mongoose.model('User', userSchema)    // Creates and exports a Mongoose model named "Cource" based on the `courceSchema`. 
