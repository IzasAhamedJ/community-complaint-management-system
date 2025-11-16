import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';


function CommiteeDashboard() {
        const cardData = [
            { total: 0, status: "total" },
            { total: 0, status: "assigned" },
            { total: 0, status: "progress" },
            { total: 0, status: "completed" }
        ];
    
        const [dashboardData, setDashboardData] = useState(cardData)
        const { axios } = useAppContext();
        const [token, setToken] = useState(null)
        const hasFetched = useRef(false);

           useEffect(() => {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    try {
                        const parsed = JSON.parse(storedToken);
                        setToken(parsed);
                    } catch (error) {
                        console.error('Error parsing token:', error);
                        toast.error('Invalid token format.');
                    }
                }
            }, []);
        
            useEffect(() => {
                if (!token || hasFetched.current) return;
        
                hasFetched.current = true;
                const fetchData = async () => {
                    try {
                        const { data: response } = await axios.get('/api/dashboard/commiteeData', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
        
                        if (response.success) {
          const updated = cardData.map(item => {
          if (item.status === "total") {
            return {
              ...item,
              total:
                response.details.assigned +
                response.details.progress +
                response.details.completed
            };
          }
          return {
            ...item,
            total: response.details[item.status]
          };
        });
        
        
          setDashboardData(updated)
        
                        }
                    } catch (error) {
                        toast.error(error.message)
                    }
                }
        
                fetchData();
        
            }, [axios, token])
    
    return (
        <>
              <div className="row">
               
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                         {dashboardData.map((card, index) => (
                        <div className="card p-3 shadow w-100"  key={index}>
                            <h5>{card.status.toUpperCase()}</h5>
                            <h3>{card.total}</h3>
                        </div>
                          ))}
                    </div>
              
            </div>
        </>
    )
}

export default CommiteeDashboard
