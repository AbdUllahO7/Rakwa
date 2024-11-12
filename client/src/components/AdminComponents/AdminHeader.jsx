import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { logoutUser } from "@/store/authSlice";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function AdminHeader({setOpen }) {

  const dispatch = useDispatch();

  function handleLogout(){

    dispatch(logoutUser())

  }

        const [isDarkMode, setIsDarkMode] = useState(() => {
          return localStorage.getItem("theme") === "dark";
      });

      useEffect(() => {
          document.documentElement.classList.toggle("dark", isDarkMode);
          localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      }, [isDarkMode]);
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b w-full ">
      <Button className="lg:hidden sm:block bg-secondary" onClick= {()=> setOpen(true)}>
        <AlignJustify className=""/>
        <span className="sr-only ">Toggle Menu</span>
      </Button>
      <div 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-14 h-8 flex items-center rounded-full cursor-pointer p-1 
                          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
              <div 
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 
                              ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
              >
                  {isDarkMode ? <Moon className="w-5 h-5 text-gray-700 mx-auto mt-0.5" /> 
                              : <Sun className="w-5 h-5 text-yellow-400 mx-auto mt-0.5" />}
              </div>
          </div>
      <div className="flex flex-1 justify-end w-full">
        <Button onClick= {handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium text-sm shadow bg-secondary dark:text-primary">
          <LogOut />
            LogOut
        </Button>
  
      </div>
    </header>
  )
}

AdminHeader.propTypes = {
  setOpen: PropTypes.any.isRequired,
}

export default AdminHeader