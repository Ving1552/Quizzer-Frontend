import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignupMiddleware() {
    const navigate = useNavigate();

    const userSignupRoute = () => {
        navigate('/userSignup');
    }

    const adminSignupRoute = () => {
        navigate('/adminSignup');
    }

  return (
    
    <div>
        <h3 className='text-center mt-5'>Do you want to</h3>
        <br />
        <div className='text-center'>
            <Button variant = 'dark' onClick={userSignupRoute} style={{'margin-right' : '30px'}}>Signup As User</Button>
        <Button variant = 'dark' onClick={adminSignupRoute}>Signup As Admin</Button>
        </div>
        
    </div>
  )
}

export default SignupMiddleware;