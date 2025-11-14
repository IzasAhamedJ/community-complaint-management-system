import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../Components/Button';


function ViewUserComplaints() {
  const [viewComplaints, setViewComplaints] = useState([]);
  const { axios } = useAppContext();
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/complaint/getAllUserComplaints');
        if (response.success) {
          const formattedData = response.data.map((item) => ({
            id: item._id,
            name: item.createdBy.username,
            title: item.title,
            description: item.description,
            street: item.street,
            status: item.status,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }));
          setViewComplaints(formattedData);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [axios]);

  
  const handleViewClick = (id) => {
    navigate(`/app/admin/complaintAssigned/${id}`);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.status === 'pending' && (
          <Button variant="primary" emitBtn={() => handleViewClick(rowData.id)}>Assign</Button>
        )
        }
             {rowData.status !== 'pending' && <div>-----</div>
        }
      </div>

    );
  };

  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'street', header: 'Street' },
    { field: 'status', header: 'Status' },
    { field: 'createdAt', header: 'Created On' },
  ];

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      className="card view-complaints-container"
    >
      <DataTable
        value={viewComplaints}
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10}
        className="p-datatable-striped"
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}

        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}

export default ViewUserComplaints;
