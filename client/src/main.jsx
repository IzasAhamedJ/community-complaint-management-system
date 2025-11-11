import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import { AppProvider } from './context/AppContext.jsx';

import { PrimeReactProvider } from 'primereact/api';
//core
import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/lara-light-indigo/theme.css";


createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <PrimeReactProvider>
     <AppProvider>
        <App />
    </AppProvider>
    </PrimeReactProvider>
</React.StrictMode>
)
