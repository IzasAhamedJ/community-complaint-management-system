import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar({ sidebarStatus }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const[isAdmin,setISAdmin]=useState(false);

  const navigate=useNavigate();


  const sidebar = () => {
    setSidebarOpen(!sidebarOpen)
    sidebarStatus(sidebarOpen)

  }

     const location = useLocation();

     const logout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo')
      navigate('/')
     }


     useEffect(()=>{
        if(location.pathname.includes('/admin')){
          setISAdmin(true);
        }
        else{
          setISAdmin(false);
        }
     },[isAdmin])
  return (
    <nav className={`sidebar ${sidebarOpen ? 'sidebarOpen' : 'sidebarClose'}`}>

      {/* Toggle Button */}
      <div
        className="close-sidebar px-3 py-2"
        onClick={sidebar}
        style={{ cursor: 'pointer' }}
      >
        <i className="bi bi-list fs-2"></i>
      </div>

      {/* Sidebar content flex container */}
      <div className="sidebar-content d-flex flex-column h-100">

        {/* Menu items */}
      {!isAdmin &&   <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <Link to="/app" className="nav-link d-flex align-items-center" >
              <i className="bi bi-speedometer2 nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/app/view-complaints" className="nav-link d-flex align-items-center">
              <i className="bi bi-graph-up nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">View Complaints</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/app/raise-complaints" className="nav-link d-flex align-items-center">
              <i className="bi bi-people nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Raise Complaints</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/app/assigned-complaints" className="nav-link d-flex align-items-center">
              <i className="bi bi-bar-chart nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Assigned Complaints</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/app/current-news" className="nav-link d-flex align-items-center">
              <i className="bi bi-gear nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Current News</span>}
            </Link>
          </li>
        </ul>}


        {isAdmin &&   <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <Link to="/app/admin" className="nav-link d-flex align-items-center" >
              <i className="bi bi-speedometer2 nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/app/admin/view-user-complaints" className="nav-link d-flex align-items-center">
              <i className="bi bi-graph-up nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">View User Complaints</span>}
            </Link>
          </li>
              <li className="nav-item">
          <Link to="/app/admin/create-current-news" className="nav-link d-flex align-items-center">
              <i className="bi bi-graph-up nav-icon px-2"></i>
              {sidebarOpen && <span className="menu-item">Create News</span>}
            </Link>
          </li>
       
        </ul>}
      

        {/* Logout pinned to bottom */}
        <div className="logout d-flex align-items-center px-3 mb-3 position-absolute bottom-0" type="button" onClick={logout}>
          <i className="bi bi-box-arrow-right px-2"></i>
          {sidebarOpen && <span>Logout</span>}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
