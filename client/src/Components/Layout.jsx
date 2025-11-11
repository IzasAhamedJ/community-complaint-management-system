import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';


function Layout() {

    const[sidebarStatus,setsidebarStatus]=useState(false);

    const handleSidebarStatus = (status) => {
    setsidebarStatus(status);
    console.log('side status',sidebarStatus)
  };

  return (
    <div className="layout">
      <Sidebar  sidebarStatus={handleSidebarStatus} />

      <div className="layout-main">
        <Header status={sidebarStatus}/>

        <div className={`main-content ${sidebarStatus===true?'contentCollapse':'contentExpand'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
