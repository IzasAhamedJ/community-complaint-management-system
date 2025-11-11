import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { Button } from '../Components/Button';
import toast from 'react-hot-toast';
  import { useNavigate } from 'react-router-dom';
function Register() {


  const [userData, setUserData] = useState({})

  const { axios } = useAppContext();

  const [registerLoad, setRegisterLoad] = useState(false);

   const navigate = useNavigate();

  // Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setRegisterLoad(true);
    try {

      const payload = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        phone: userData.contact
      }

      const data=await axios.post('/api/user/registration',payload);
       
      console.log('data',data)

      if(data.data.success){
          console.log('regsiter res',data)
          toast.success('User Registered Successfully')
          setTimeout(() => {
            
             setRegisterLoad(false);
                navigate('/');
          }, 2000);
            
      }

    } catch (error) {
       toast.success(error.message)
            setRegisterLoad(false);
    }



    console.log(userData); // You can send this to your backend API
  };

  const isFormIncomplete = !userData.username || !userData.email || !userData.password || !userData.contact;


  return (
    <>
      <section id="login">
        <div className='login-wrapper h-100'>
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-md-4 col-lg-4 m-auto">
                <div className="card text-center p-4">
                  <div className='fs-2 fw-medium mb-3 '>Register</div>
                  <div className='mb-4'>
                    <input type="text" name="username" id="" placeholder='UserName' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    <input type="text" name="email" id="" placeholder='Email' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    <input type="text" name="password" id="" placeholder='Password' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    <input type="text" name="contact" id="" placeholder='Contact' onChange={handleInput} />
                  </div>
                  <div className='mb-4'>
                    {/* <button className='common-btn w-100 p-2 rounded-2 border-0' onClick={handleSubmit} disabled={isFormIncomplete}>Register</button> */}
                    <Button variant="primary" type="submit" disabled={isFormIncomplete} className='w-100' isLoading={registerLoad} emitBtn={handleSubmit}>
                      Register
                    </Button>
                  </div>
                  <div>Already have an account?<Link to="/" className='px-1'>Login</Link></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Register
