import React, { useEffect, useState } from 'react'

function Header({status}) {
   
   const userInfo=JSON.parse(localStorage.getItem('userInfo'))
   
   useEffect(() => {


  }, [status]);

    return (
        <>
           <div className={`header ${status===true?'headerCollapse':'headerExpand'} px-4 py-3`}>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-4'>
                       LOGO
                    </div>
                    <div className='bg-white text-black p-2 rounded-3'>
                        {userInfo.username}
                    </div>
                  </div>
           </div>
        </>
    )
}

export default Header
