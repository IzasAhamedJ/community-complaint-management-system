import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { Button } from '../Components/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [userData, setUserData] = useState({})

  const [LoginLoad, setLoginLoad] = useState(false)

  const { axios } = useAppContext();


  const navigate=useNavigate();


  // Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleSubmit = async () => {
  setLoginLoad(true);
  try {
    const payload = {
      email: userData.email,
      password: userData.password,
    };

    const { data: response } = await axios.post('/api/user/login', payload);

    if (response.success) {
      toast.success('Login Successfully');
      localStorage.setItem('token', JSON.stringify(response.token));
      localStorage.setItem('userInfo', JSON.stringify(response.user));

      setTimeout(() => {
        setLoginLoad(false);
        if (response.user.role === 'member') {
          navigate('/app/raise-complaints');
          return;
        }
        if (response.user.role === 'admin') {
          navigate('/app/admin/view-user-complaints');
          return;
        }
      }, 2000);
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || 'Something went wrong. Please try again.';
    toast.error(errorMsg);
    setLoginLoad(false);
  }
};



  const formInComplete = !userData.email || !userData.password


  return (
    <>
      <section id="login">
        <div className='login-wrapper h-100'>
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-md-4 col-lg-4 m-auto">
                <div className="card text-center p-4">
                  <div className='fs-2 fw-medium mb-3 '>Login</div>
                  <div className='mb-4'>
                    <input type="email" name="email" id="" placeholder='Email' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    <input type="text" name="password" id="" placeholder='Password' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    <Button variant="primary" type="submit" disabled={formInComplete} className='w-100' isLoading={LoginLoad} emitBtn={handleSubmit}>
                      Login
                    </Button>
                  </div>
                  <div>Don't have an account?<Link to="/register" className='px-1'>Register</Link></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Login
