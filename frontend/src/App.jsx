import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";         // Importing necessary components from React Router for routing
import SignUpPage from "./components/SignUpPage";
import SigninPage from "./components/SigninPage";
import Home from "./components/Home";
import UserContextProvider from "./Context/UserContextProvider";
import AddCource from "./components/AddCource";
import CourceContextProvider from "./Context/CourceContextProvider";
import Navbar from "./components/Navbar";



// Defining a layout with a Navbar and an Outlet.

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <UserContextProvider>        {/* Wrapping the app with UserContextProvider to provide global user context to the entire app. */}
      <CourceContextProvider>    {/* Wrapping the app with CourceContextProvider to provide global course context to the entire app. */}
        <Router>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route element={<LayoutWithNavbar />} >
              
            <Route path="/home" element={<Home />} />
            <Route path="/addCource" element={<AddCource />} />
            </Route>
     
          </Routes>
        </Router>
      </CourceContextProvider>
    </UserContextProvider>
  );
};

export default App;
