import express from "express"
import core from "cors"
import cookieParser from "cookie-parser"
import path from "path"




const app = express()     // Initialize the Express application
const _dirname = path.resolve()



app.use(                  // Middleware to enable CORS 
    core(
        {
        origin:process.env.CORS_ORIGIN ,    //initialising the originfor core
        credentials:true,                   // for sending cookies and credentials with requests
        }
    ))

app.use(express.json())     // Middleware to parse incoming JSON payloads   
app.use(express.urlencoded({ extended: true }));   // Middleware to parse URL-encoded data
app.use(cookieParser());    // Middleware to parse cookies in incoming requests




import router from "./routes/user.routes.js"         // User-related routes 
import courceRouter from "./routes/cource.routes.js"  // Course-related routes 


app.use("/api/v1/users", router)          // Use the user router for all requests starting with /api/v1/users

app.use("/api/v1/cources", courceRouter)   // Use the course router for all requests starting with /api/v1/cources


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


export {app}



