import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect } from 'react';

function AssignedComplaints() {

    const [viewAssignedComplaints, setViewAssignedComplaints] = useState([ {
            _id: "c1",
            title: "Street Light Not Working",
            description: "The street light near my house has not been working for 3 days.",
            status: "Pending",
            assignedTo: "Ravi Kumar",
            createdAt: "2025-11-05T10:30:00Z"
        },
        {
            _id: "c2",
            title: "Water Leakage in Community Hall",
            description: "There is continuous water leakage in the community hall bathroom.",
            status: "In Progress",
            assignedTo: "Anita Sharma",
            createdAt: "2025-11-07T14:45:00Z"
        },
        {
            _id: "c3",
            title: "Garbage Not Collected",
            description: "Garbage has not been collected in our lane for the past 2 days.",
            status: "Resolved",
            assignedTo: "Suresh Patel",
            createdAt: "2025-11-09T09:15:00Z"
        }]);


    const columns = [
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
        { field: 'status', header: 'Status' },
        { field: 'createdAt', header: 'Created On' }
    ];

    useEffect(() => {
       
    }, [])

    return (
        <>
            <section>
                  <div style={{
                               padding: '1rem',
                               //   margin: '2rem',
                               background: '#ffffff',
                               borderRadius: '10px',
                               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                           }} className="view-complaints-container">
                               <DataTable value={viewAssignedComplaints} tableStyle={{ minWidth: '50rem' }}>
                                   {columns.map((col, i) => (
                                       <Column key={col.field} field={col.field} header={col.header} />
                                   ))}
                               </DataTable>
                           </div>
            </section>
        </>
    )
}

export default AssignedComplaints
