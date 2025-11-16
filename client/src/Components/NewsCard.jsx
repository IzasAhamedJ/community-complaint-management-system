import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { useAppContext } from '../context/AppContext';

function NewsCard({id,dataId,image, title, description, date ,deleteAnnouncement}) {


    const { image_base_url } = useAppContext();

    const [role, setRole] = useState(null);


    useEffect(() => {
        const storedUserData = localStorage.getItem('userInfo');
        if (storedUserData) {
            try {
                const parsed = JSON.parse(storedUserData);
                setRole(parsed.role);
            } catch (error) {
                toast.error('Error.');
            }
        }
    }, [])



    return (
        <>
      
            <div className='card' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: '300px' }}>
                <div>
                    <img src={`${image_base_url}${image}`} alt="" className='object-fit-cover w-100' style={{ height: '200px' }} />
                </div>
                <div className='p-2 d-flex align-items-end justify-content-between'>
                    <div>
                        <div className='fw-bold'>{title}</div>
                        <div className="fw-medium text-muted">
                            {description?.length > 100
                                ? `${description.slice(0, 100)}...`
                                : description}
                        </div>

                    </div>
                    {
                        role == 'admin' && <div type="button">
                            <i className="pi pi-trash text-danger" style={{ fontSize: '1.5rem' }}  onClick={() => deleteAnnouncement(id)}></i>
                        </div>
                    }

                </div>
            </div>
        </>
    );
}

export default NewsCard
