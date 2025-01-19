class apiError extends Error {  // Class to handle API errors
    constructor(          //Parametersof constructor
        statusCode,
        message="Something going wrong",
        errors=[],
        stack=''
    ) {
        super(message)                  // Call parent Error class constructor with the error message.
        this.statusCode = statusCode    // Set the status code for the error.
        this.data = null                // Initialize as null
        this.success = false            // Mark the operation as unsuccessful.
        this.errors=errors              // Store additional error details

        if (stack) {
            this.stack = stack          // Use the provided stack trace.
        } else{
            Error.captureStackTrace(this, this.constructor)  // Capture and attach stack trace automatically.
        }
    }
}

export{
    apiError
}