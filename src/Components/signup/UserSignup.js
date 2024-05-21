import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SlLogin } from 'react-icons/sl'
import signupimg from '../../images/signupimg.svg';

function UserSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onFormSubmit = async(userObj) => {
    //http post request
    await axios.post('https://enthusiastic-mercy-production.up.railway.app/user/register', userObj)
      .then(response => {
        alert(response.data);
        //if user created successfully navigate to login as user
        if (response.data === 'Success') {
          navigate('/loginmiddleware')
        }
        else if(response.data === 'Username already exists, please choose some other username') {
          alert(response.data);
        }
      })
      .catch(error => alert("Something went wrong"))
  }

  return (
    <div>
      <Container style={{ marginTop: '7rem' }}>
        <Row>
          <Col><img className='w-75 mx-auto' src={signupimg} style={{ marginTop: '3rem' }}></img></Col>
          <Col>
            <h3 className="text-center mb-3">Register As User</h3>
            <Form className="w-100 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" {...register("name", { required: true })}></Form.Control>
                {errors.name && <p className='text-danger'>* Name is required</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" {...register("username", { required: true })}></Form.Control>
                {errors.username && <p className='text-danger'>* Username is required</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" {...register("password", { required: true })}></Form.Control>
                {errors.password && <p className='text-danger'>* Password is required</p>}
              </Form.Group>
              <div className="text-center mb-3"><Button className="w-50 mx-auto mb-3" variant='success' type='submit'>
                Signup <SlLogin />
              </Button></div>
            </Form></Col>
        </Row>
      </Container>
    </div>
  )
}

export default UserSignup;