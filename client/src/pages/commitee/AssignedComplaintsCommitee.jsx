import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '../../Components/Button';
import toast from 'react-hot-toast';

function AssignedComplaintsCommitee() {

    const [viewComplaints, setViewComplaints] = useState([]);
    const { axios } = useAppContext();
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false);
    const [token, setToken] = useState(null);



    const columns = [

        { field: 'title', header: 'Title' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Contact Number' },
        { field: 'status', header: 'Status' },
    ];



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
    }, [axios, token]);


    useEffect(() => {
        if (!token || hasFetched.current) return;

        hasFetched.current = true;
        setLoading(true);

        fetchData();
    }, [token]);


    const fetchData = async () => {
        try {
            const { data: response } = await axios.get(
                '/api/assignComplaint/getComplaintsByAssignedUser',
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.success) {
                const formatData = response.data.map((data) => ({
                    id: data.complaintId._id,
                    title: data.complaintId.title,
                    name: data.complaintRaisedUser.username,
                    email: data.complaintRaisedUser.email,
                    phone: data.complaintRaisedUser.phone,
                    status: data.complaintId.status
                }))

                setViewComplaints(formatData)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };



 const actionBodyTemplate = (rowData) => {
    if (rowData.status === 'Completed') {
        return <span>-</span>;
    }
    if (rowData.status === 'assigned') {
        return (
            <Button 
                isLoading={loading} 
                emitBtn={() => updateStatus(rowData.id, 3)}
            >
                Take Progress
            </Button>
        );
    }

    return (
        <Button 
            isLoading={loading} 
            emitBtn={() => updateStatus(rowData.id, 4)}
        >
            Complete
        </Button>
    );
};


    const updateStatus = async (id, status) => {
        setLoading(true)
        try {
            const { data: response } = await axios.put(`/api/assignComplaint/updateStatus/${id}/${status}`)

            if (response.success) {
                toast.success(response.message);
                fetchData();
                setLoading(false)

            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div
                style={{
                    padding: '1rem',
                    background: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                className="view-complaints-container"
            >
                {loading ? (
                    <p>Loading complaints...</p>
                ) : viewComplaints.length > 0 ? (
                    <DataTable value={viewComplaints} tableStyle={{ minWidth: '50rem' }}>
                        {columns.map((col) =>
                            <Column key={col.field} field={col.field} header={col.header} />

                        )}
                        <Column header="Action" body={actionBodyTemplate} />
                    </DataTable>
                ) : (
                    <div className="text-center text-muted fs-5 p-4">
                        No complaints found.
                    </div>
                )}
            </div>

        </>
    )
}

export default AssignedComplaintsCommitee
