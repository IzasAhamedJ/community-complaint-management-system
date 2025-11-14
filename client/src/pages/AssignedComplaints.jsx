import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

function AssignedComplaints() {
  const [assignedData, setAssignedData] = useState([]);
  const[token,setToken]=useState(null);

  const { axios } = useAppContext();
  const hasFetched = useRef(false);

  const columns = [
    { field: 'complaintTitle', header: 'Complaint Title' },
    { field: 'username', header: 'Assigned To' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Contact Number' },
    { field: 'role', header: 'Role of Committee' },
    { field: 'assignedAt', header: 'Assigned Date' },
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
    }, []);

  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;

    const fetchAssignedComplaints = async () => {
      try {
        const { data: response } = await axios.get(
          '/api/assignComplaint/getComplaintsByUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data);

        if (response.success && Array.isArray(response.data)) {
          // ✅ Map response into a flat array with both complaint & user info
          const formattedData = response.data.map((item) => ({
            complaintTitle: item.complaintId?.title || 'N/A',
            username: item.assignedTo?.username || 'N/A',
            email: item.assignedTo?.email || 'N/A',
            phone: item.assignedTo?.phone || 'N/A',
            role: item.assignedTo?.role || 'N/A',
            assignedAt: new Date(item.assignedAt).toLocaleString(),
          }));

          setAssignedData(formattedData);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || 'Failed to load data');
      }
    };

    fetchAssignedComplaints();
  }, [axios, token]);

  return (
    <section>
      <div
        style={{
          padding: '1rem',
          background: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        className="view-complaints-container"
      >
        {assignedData.length > 0 ? (
          <DataTable value={assignedData} tableStyle={{ minWidth: '60rem' }}>
            {columns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        ) : (
          <div className="text-center text-muted fs-5 p-4">
            No assigned complaints found.
          </div>
        )}
      </div>
    </section>
  );
}

export default AssignedComplaints;
