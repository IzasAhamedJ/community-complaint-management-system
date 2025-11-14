import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sidebar({ sidebarStatus }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebar = () => {
    setSidebarOpen(!sidebarOpen);
    sidebarStatus(sidebarOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  // ✅ Get role from localStorage.userInfo on mount (and update if storage changes)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.role || null);
      } catch (error) {
        console.error('Error parsing userInfo:', error);
      }
    }
  }, []); // runs once when Sidebar mounts

  useEffect(() => {
    console.log('role', role);
  }, [role]);

  if (!role) return null; // optional — show nothing until role is loaded

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

      {/* Sidebar content */}
      <div className="sidebar-content d-flex flex-column h-100">
        {role === 'member' && (
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <Link to="/app" className="nav-link d-flex align-items-center">
                <i className="bi bi-speedometer2 nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Dashboard</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/view-complaints"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-graph-up nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">View Complaints</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/raise-complaints"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-people nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Raise Complaints</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/assigned-complaints"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-bar-chart nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Assigned Complaints</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/current-news"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-gear nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Announcment</span>}
              </Link>
            </li>
          </ul>
        )}

        {role === 'admin' && (
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <Link to="/app/admin" className="nav-link d-flex align-items-center">
                <i className="bi bi-speedometer2 nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Dashboard</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/admin/view-user-complaints"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-graph-up nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">View User Complaints</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/admin/create-current-news"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-graph-up nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Create Announcment</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/admin/users"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-graph-up nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Users</span>}
              </Link>
            </li>
             <li className="nav-item">
              <Link
                to="/app/current-news"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-gear nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Announcment</span>}
              </Link>
            </li>
          </ul>
        )}


        {role === 'committee' && (
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <Link to="/app/admin" className="nav-link d-flex align-items-center">
                <i className="bi bi-speedometer2 nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Dashboard</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/committee/view-complaints"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-graph-up nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">View User Complaints</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/app/current-news"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-gear nav-icon px-2"></i>
                {sidebarOpen && <span className="menu-item">Announcment</span>}
              </Link>
            </li>

          </ul>
        )}

        {/* Logout pinned to bottom */}
        <div
          className="logout d-flex align-items-center px-3 mb-3 position-absolute bottom-0"
          type="button"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right px-2"></i>
          {sidebarOpen && <span>Logout</span>}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
