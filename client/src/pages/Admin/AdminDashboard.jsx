import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';

function AdminDashboard() {
   const cardData = [
              { total: 0, status: "total" },
               { total: 0, status: "pending" },
              { total: 0, status: "assigned" },
              { total: 0, status: "progress" },
              { total: 0, status: "completed" }
          ];
      
          const [dashboardData, setDashboardData] = useState(cardData)
          const { axios } = useAppContext();
          const hasFetched = useRef(false);
  
          
              useEffect(() => {
                  if (hasFetched.current) return;
          
                  hasFetched.current = true;
                  const fetchData = async () => {
                      try {
                          const { data: response } = await axios.get('/api/dashboard/adminData');
          
                          if (response.success) {
            const updated = cardData.map(item => {
            if (item.status === "total") {
              return {
                ...item,
                total:
                 response.details.pending +
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
          
              }, [])
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

export default AdminDashboard
