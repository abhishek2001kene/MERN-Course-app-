import React, { useState } from "react";
import UserContext from "./UserContext";   // Importing the context for managing user data



// Defining the UserContextProvider component to wrap children components
const UserContextProvider =({children}) =>{

const [user, setuser] = useState(null)     // State for storing the user information, default is null




    return(
// Wrapping the children with the context provider, so they can access the context
        <UserContext.Provider value={{user, setuser}}>         
        {children}                                          
        </UserContext.Provider>
    )
}

export default UserContextProvider