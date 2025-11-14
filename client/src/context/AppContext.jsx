import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { jsxs } from "react/jsx-runtime";



axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



export const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const image_base_url = import.meta.env.VITE_BACKEND_URL;


    useEffect(() => {
        // Safely get token
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                setToken(JSON.parse(storedToken));
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        }

        // Safely get userInfo and role
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setRole(parsedUserInfo?.role || null);
            } catch (error) {
                console.error('Error parsing userInfo:', error);
            }
        }
    }, []);

    const value = {
        axios,
        image_base_url,
        role
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext);