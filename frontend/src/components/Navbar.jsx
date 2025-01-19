import React,{useContext} from 'react'   // Import React and useContext to manage context state
import { Link } from 'react-router-dom'   // Import Link component for navigation between pages
import { SiSemanticweb } from "react-icons/si";   // Import the Semantic Web icon from react-icons




function Navbar() {



return (
    <div className='flex items-center justify-between bg-white text-blue-600 shadow shadow-black sticky top-0 z-50 md:p-4 p-2'>
        <div className='md:ml-28 ml-6'>
        <SiSemanticweb      //{/* Render Semantic Web icon with a size of 60 */}
    size={60}
    />
    <div>
        
    </div>
        </div>
        <div className='md:mr-20 mr-4'>
            <ul className='flex md:gap-10 gap-3 font-bold md:text-xl text-xs'>
            <Link to='/home'><li>Home</li></Link>           {/* Menu item for Home */}
            <Link to='/Addcource'><li>Add Course</li></Link>    {/* Menu item for Add Course */}
            <Link to='/signup'><li>New Registation</li></Link>    {/* Menu item for registation */}
            </ul>
        </div>
    </div>
)
}

export default Navbar

