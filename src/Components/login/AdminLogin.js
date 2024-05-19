import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoMdLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import loginimg from '../../images/loginimg.svg';
import { adminlogin } from '../../redux/slices/Adminslice';
import axios from 'axios';

function AdminLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const onFormSubmit = async (adminCredentialObj) => {
        const response = await axios.post('http://viaduct.proxy.rlwy.net:37369/railway', adminCredentialObj);
        if (response.data === 'Success') {
            navigate('/admindashboard');
            dispatch(adminlogin(adminCredentialObj));
        }
        else if (response.data === 'Wrong Password') {
            alert('Wrong Password');
        }
        else alert("Something went wrong");
    }

        return (
            <div><Container style={{ marginTop: '5rem' }}>
                <Row>
                    <Col><img className='w-75 mx-auto mt-5' src={loginimg}></img></Col>
                    <Col>
                        <h3 className="text-center mb-3 mt-5">Login As Admin</h3>
                        <Form className="w-100 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
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

                            <div className="text-center"><Button className="w-50 mx-auto" variant='success' type='submit'>
                                Login <IoMdLogIn />
                            </Button></div>
                        </Form>
                    </Col>
                </Row>
            </Container></div>
        )
    }

    export default AdminLogin;