import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginMiddleware() {
    const navigate = useNavigate();

    const userLoginRoute = () => {
        navigate('/userLogin');
    }

    const adminLoginRoute = () => {
        navigate('/adminLogin');
    }

  return (
    
    <div>
        <h3 className='text-center mt-5'>Do you want to</h3>
        <br />
        <div className='text-center'>
            <Button variant = 'dark' onClick={userLoginRoute} style={{'margin-right' : '30px'}}>Login As User</Button>
        <Button variant = 'dark' onClick={adminLoginRoute}>Login As Admin</Button>
        </div>
        
    </div>
  )
}

export default LoginMiddleware;