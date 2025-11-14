import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

function ViewComplaints() {
  const [viewComplaints, setViewComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const { axios, image_base_url } = useAppContext();
  const hasFetched = useRef(false);

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

  // Step 1: Load token from localStorage
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

  // Step 2: Fetch complaints only after token is available
  useEffect(() => {
    if (!token || hasFetched.current) return; // wait for token

    hasFetched.current = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/complaint/getComplaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setViewComplaints(response.data.data.reverse());
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to load data.';
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axios, token]); // depend on token

  return (
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
      ) : (
        <div className="text-center text-muted fs-5 p-4">
          No complaints found.
        </div>
      )}
    </div>
  );
}

export default ViewComplaints;
