import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function CommiteeDashboard() {
    const cardData = [
        { total: 0, status: "total" },
        { total: 0, status: "assigned" },
        { total: 0, status: "progress" },
        { total: 0, status: "completed" }
    ];
    const columns = [
        { field: 'image', header: 'Image' },
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
        { field: 'houseThalaivarName', header: 'Head of House' },
        { field: 'houseThalaivarNumber', header: 'Head of House Number' },
        { field: 'street', header: 'Street' },
        { field: 'status', header: 'Status' },
        { field: 'createdAt', header: 'Created On' },
    ];

    const [dashboardData, setDashboardData] = useState(cardData)
    const { axios, image_base_url } = useAppContext();
    const [token, setToken] = useState(null)
    const hasFetched = useRef(false);
    const [viewComplaints, setViewComplaints] = useState([]);



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


                    setDashboardData(updated);
                    const complaintDataArray = response.latest.map(item => item.complaintId);

                    setViewComplaints(complaintDataArray.reverse());

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
                        <div className="card p-3 shadow w-100" key={index}>
                            <h5>{card.status.toUpperCase()}</h5>
                            <h3>{card.total}</h3>
                        </div>
                    ))}
                </div>

            </div>
            <div className='fs-4 fw-bold'>
                Latest Five Complaints
                <div>
                    <DataTable value={viewComplaints} tableStyle={{ minWidth: '50rem' }}>
                        {columns.map((col) =>
                            col.field !== 'image' ? (
                                <Column key={col.field} field={col.field} header={col.header} />
                            ) : (
                                <Column
                                    key={col.field}
                                    header={col.header}
                                    body={(rowData) => (
                                        <img
                                            className="rounded-circle"
                                            src={`${image_base_url}${rowData.image}`}
                                            alt="Complaint"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                />
                            )
                        )}
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default CommiteeDashboard
