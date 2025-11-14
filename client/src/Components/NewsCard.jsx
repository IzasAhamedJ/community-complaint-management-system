import React from 'react'
import { Card } from 'primereact/card';
import { useAppContext } from '../context/AppContext';

function NewsCard({ image, title, description, date }) {


    const { image_base_url } = useAppContext();

    return (
        <>


            <div className='card' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", height: '320px' }}>
                <div>
                    <img src={`${image_base_url}${image}`} alt="" className='object-fit-cover w-100' style={{ height: '200px' }} />
                </div>
                <div className='p-2'>
                    <div className='fw-bold'>{title}</div>
                    <div className="fw-medium text-muted">
                        {description?.length > 100
                            ? `${description.slice(0, 100)}...`
                            : description}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsCard
