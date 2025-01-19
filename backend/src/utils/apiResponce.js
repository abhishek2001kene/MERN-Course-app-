class apiResponce {                  // Class to handle standardized API responses
    constructor(
        statusCode, data, message= "Success"      //parameters
    ) {
        this.statusCode=statusCode           // Set the HTTP status code.
        this.data = data                     // Attach the response data/payload.
        this.message = message               // Attach a response message.
        this.success = statusCode < 400      // Mark success as true if status code is less than 400 (indicating success).
    }
}

export {
    apiResponce
}