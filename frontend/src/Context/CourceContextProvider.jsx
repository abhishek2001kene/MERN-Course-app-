import React,{useState} from 'react'

import CourceContext from './CourceContext.js'         // Importing the context where we will store the state

function CourceContextProvider({children}) {           // Defining the CourceContextProvider component to wrap children components

const [cource, setcource] = useState(null)            // The current course selected, default is null
const [courcelist, setcourcelist] = useState([])      // List of courses, initially an empty array
const [pending, setpending] = useState(false)         // Boolean to indicate if there is a pending request
const [isEdit, setisEdit] = useState(false)           // Boolean to check if course is being edited


  return (
    <CourceContext.Provider value={{cource, setcource, courcelist, setcourcelist, pending, setpending,isEdit, setisEdit}}>        
        {children}
    </CourceContext.Provider>
    // Wrapping the children with the context provider, so they can access the context

  )
}

export default CourceContextProvider