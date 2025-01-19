import { asynHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponce } from "../utils/apiResponce.js";
import { User } from "../moduels/user.model.js";





const generateAccessAndRefreshToken = async (userId) => {

  try {
      const user = await User.findById(userId)          // Fetch the user document by ID from the database.

      const accessToken = user.generateAccessToken()    // Generate a new access token using the user's method.
      const refreshToken = user.generateRefreshToken()  // Generate a new refresh token using the user's method.

      if (!accessToken || !refreshToken) // Throw an error if token generation fails.
        {      
          throw new apiError(501, "Error During generate access and refresh Token")
      }

      user.refreshToken = refreshToken  // Assign the refresh token to the user's document.

      await user.save({ validateBeforeSave : false })

      return {accessToken, refreshToken}

      
  } catch (error) {
      
      throw new apiError(error?.status || 501, error?.message || "Error During Generatitng Tokens")
  }

}






const userSignup = asynHandler(async (req, res) => {
  const { fullName, email, password } = req.body;            // get user details  the fullName, email, and password from the request body.

  if (!fullName || !email || !password) {
    throw new apiError(400, "All fields are required.");      // Check for missing required fields and throw a 400 error..
  }

  const existUser = await User.findOne({ email });           // Check if a user with the provided email already exists.

  if (existUser) {
    throw new apiError(409, "User with email already existed");
  }

  const user = await User.create({                                       // Create a new user in the database.
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(              // Retrieve the created user without the password and refreshToken fields.
    "-password -refreshToken"
  );

  if (!createdUser) {                                                      // Throw a 500 error if the user retrieval fails.           
    throw new apiError(500, "Something went wrong while registering user");
  }

  return res                                                              // Respond with the created user and a success message.
    .status(201)
    .json(
      new apiResponce(
        201,
        createdUser,
        "User registered successfully"
      )
    );
});






const userLogin = asynHandler(async (req, res)=> {

  const {email, password} = req.body                       // Extract email and password from the request body.

  if (!email || !password) {                               // Throw a 401 error if any field is missing.
    throw new apiError(401, "All fields are required.")
  }

  const existUser = await User.findOne({email})              // Find a user in the database by email.

  if (!existUser) {
    throw new apiError(401, "User not existed.")
  }

  const isPasswordValid = await existUser.isPasswordcorrect(password)    // Verify if the provided password matches the hashed password.


  if (!isPasswordValid) {
    throw new apiError(401, "Incorrect password")                        // Throw a 401 error if the password is incorrect.
  }
  
  const {refreshToken, accessToken} = await generateAccessAndRefreshToken(existUser._id)         // Generate access and refresh tokens for the user.
  
  
  const loggedInUser = await User.findById(existUser._id).select("-password -refreshToken")      // Retrieve the logged-in user without sensitive fields.
  
  const options = {
     maxAge: 1 * 24 * 60 * 60 * 1000,               //Duration How totokens in browserr
     httpsOnly: true,                               // Cookie is accessible only by the server.
     sameSite: 'strict'
}


return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(
  new apiResponce(
    200,
    {
      user : loggedInUser,
      accessToken,
      refreshToken
    },
    "User logged in Successfully"
  )
)
})






export {
  userSignup,
  userLogin,
};
