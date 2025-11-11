import React from 'react'
import { Card } from 'primereact/card';

function NewsCard({ image, title, description, date }) {

    return (
        <>


            <div className='card' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",height:'350px' }}>
                <div>
                    <img src={image} alt="" className='object-fit-cover w-100' style={{ height: '200px' }} />
                </div>
                <div className='p-2'>
                    <div className='fw-bold'>{title}</div>
                    <div className='fw-medium text-muted'>{description}</div>
                </div>
            </div>
        </>
    );
}

export default NewsCard
