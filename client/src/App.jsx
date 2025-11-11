import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Layout from './Components/Layout.jsx';
import ClientDashboard from './pages/ClientDashboard.jsx';
import ViewComplaints from './pages/ViewComplaints.jsx';
import RaisesComplaints from './pages/RaisesComplaints.jsx';
import CurrentNews from './pages/CurrentNews.jsx';
import AssignedComplaints from './pages/AssignedComplaints.jsx';


/**---Admin---- */
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ViewUserComplaints from './pages/Admin/ViewUserComplaints.jsx';
import CreateCurrentNews from './pages/Admin/CreateCurrentNews.jsx';

import { Toaster } from 'react-hot-toast'






function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/app',
      element: <Layout />,
      children: [
        { index: true, element: <ClientDashboard /> },
        { path: 'view-complaints', element: <ViewComplaints /> },
        { path: 'raise-complaints', element: <RaisesComplaints /> },
        { path: 'current-news', element: <CurrentNews /> },
        { path: 'assigned-complaints', element: <AssignedComplaints /> },
      ],
    },
    {
      path: 'app/admin',
      element: <Layout />,
      children: [
        {
          index: true, element: <AdminDashboard />
        },
        {
          path: 'view-user-complaints',
          element: <ViewUserComplaints />
        },
        {
          path: 'create-current-news',
          element: <CreateCurrentNews />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
