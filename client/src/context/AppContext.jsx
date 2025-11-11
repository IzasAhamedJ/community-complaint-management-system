import { createContext,useContext,useEffect,useState } from "react";
import axios from "axios"



axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;



export const AppContext=createContext();


export const AppProvider=({children})=>{
         const[isAdmin,setIsAdmin]=useState(false)

         const image_base_url=import.meta.env.VITE_BACKEND_URL;
    

         const value={
            axios,
            image_base_url
         }

       return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
         
}

export const useAppContext=()=>useContext(AppContext);