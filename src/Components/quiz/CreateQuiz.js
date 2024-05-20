import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectIsAdminLoggedIn } from '../../redux/slices/Adminslice';

function CreateQuiz() {
    const loggedIn = useSelector(selectIsAdminLoggedIn);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const onFormSubmit = async (newQuizDetails) => {
        const response = await axios.post('http://enthusiastic-mercy-production.up.railway.app/quiz/createQuiz', newQuizDetails);
        if (response.data === 'Quiz created successfully') {
            navigate('/viewAllQuizzes');
        }
        else alert("Something went wrong");
    }

    return (
        <div>
            {
                (loggedIn === true) ?
                    (
                        <div><Container style={{ marginTop: '2rem' }}>
                            <Row>
                                <Col>
                                    <h3 className="text-center mb-3 mt-5">Create A New Quiz</h3>
                                    <Form className="w-75 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Quiz Title</Form.Label>
                                            <Form.Control type="text" placeholder="Enter quiz title" {...register("title", { required: true })}></Form.Control>
                                            {errors.title && <p className='text-danger'>* Title is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Quiz Category</Form.Label>
                                            <Form.Control type="text" placeholder="Enter quiz category" {...register("category", { required: true })}></Form.Control>
                                            {errors.category && <p className='text-danger'>* Category is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Number of Questions</Form.Label>
                                            <Form.Control type="number" placeholder="Enter number of questions" {...register("numQ", { required: true })}></Form.Control>
                                            {errors.numQ && <p className='text-danger'>* Number of Questions is required</p>}
                                        </Form.Group>

                                        <div className="text-center"><Button className="w-50 mx-auto" variant='success' type='submit'>
                                            Create Quiz
                                        </Button></div>
                                    </Form>
                                </Col>
                            </Row>
                        </Container></div>
                    )
                    :
                    (

                        <div>
                            <h2 className='text-center heading-2'>Admin logged out</h2>
                            <br />
                            <Link to='/loginmiddleware'>
                                <div className='dark text-center'><Button variant="dark">Click here to login again</Button>
                                </div>
                            </Link>
                        </div>
                    )
            }
        </div>
    )
}

export default CreateQuiz;