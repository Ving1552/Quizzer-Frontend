import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectIsAdminLoggedIn } from '../../redux/slices/Adminslice';

function AddQuestion() {
    const loggedIn = useSelector(selectIsAdminLoggedIn);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let navigate = useNavigate();

    const onFormSubmit = async (newQuestionDetails) => {
        const response = await axios.post('http://localhost:8080/question/addQuestion', newQuestionDetails);
        if (response.data === 'Question added successfully') {
            alert("Question added successfully");
            navigate('/viewAllQuestions');
        }
        else alert("Something went wrong");
    }

    return (
        <div>
            {
                (loggedIn === true) ?
                    (
                        <div><Container style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                            <Row>
                                <Col>
                                    <h3 className="text-center mb-3 mt-5">Add A New Question</h3>
                                    <Form className="w-75 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question</Form.Label>
                                            <Form.Control type="text" placeholder="Enter question" {...register("questionTitle", { required: true })}></Form.Control>
                                            {errors.questionTitle && <p className='text-danger'>* Question is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Option1</Form.Label>
                                            <Form.Control type="text" placeholder="Enter option1" {...register("option1", { required: true })}></Form.Control>
                                            {errors.option1 && <p className='text-danger'>* Option1 is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Option2</Form.Label>
                                            <Form.Control type="text" placeholder="Enter option2" {...register("option2", { required: true })}></Form.Control>
                                            {errors.option2 && <p className='text-danger'>* Option2 is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Option3</Form.Label>
                                            <Form.Control type="text" placeholder="Enter option3" {...register("option3", { required: true })}></Form.Control>
                                            {errors.option3 && <p className='text-danger'>* Option3 is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Option4</Form.Label>
                                            <Form.Control type="text" placeholder="Enter option4" {...register("option4", { required: true })}></Form.Control>
                                            {errors.option4 && <p className='text-danger'>* Option4 is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Right Answer</Form.Label>
                                            <Form.Control type="text" placeholder="Enter right answer" {...register("rightAnswer", { required: true })}></Form.Control>
                                            {errors.rightAnswer && <p className='text-danger'>* Right Answer is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Difficulty Level</Form.Label>
                                            <Form.Control type="text" placeholder="Enter difficulty level" {...register("difficultyLevel", { required: true })}></Form.Control>
                                            {errors.difficultyLevel && <p className='text-danger'>* Difficulty Level is required</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Quiz Category</Form.Label>
                                            <Form.Control type="text" placeholder="Enter quiz category" {...register("category", { required: true })}></Form.Control>
                                            {errors.category && <p className='text-danger'>* Category is required</p>}
                                        </Form.Group>

                                        <div className="text-center"><Button className="w-50 mx-auto" variant='success' type='submit'>
                                            Add Question
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

export default AddQuestion;