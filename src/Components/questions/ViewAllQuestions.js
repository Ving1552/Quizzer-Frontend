import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAdminLoggedIn, updateSelectedQuestion } from '../../redux/slices/Adminslice';

function ViewAllQuestions() {
    const loggedIn = useSelector(selectIsAdminLoggedIn);
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let questionNo = 0;

    const fetchData = async () => {
        await axios.get(`http://localhost:8080/question/getAllQuestions`)
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((error) => {
                alert("Something went wrong");
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addQuestion = () => {
        navigate('/addQuestion');
    }

    const updateQuestion = (questionId) => {
        dispatch(updateSelectedQuestion(questionId));
        navigate('/updateQuestion');
    }

    const deleteQuestion = async(questionId) => {
        await axios.delete(`http://localhost:8080/question/deleteQuestion/${questionId}`)
        .then((response) => {
            if (response.data === 'Question Successfully Deleted') {
                alert("Question deleted successfully");
                fetchData();
                navigate('/viewAllQuestions');
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        })
    }

    return (
        <div>
      {
        (loggedIn === true) ?
          (
            <div>
            <h2 className='mt-5 mb-3 text-center'>All Questions</h2>
            <br></br>
            <div className='text-center mb-5'>
                <Button variant='primary' onClick={addQuestion} style={{ 'margin-right': '30px' }}>Add Question</Button>
            </div>
            {questions.map((question, index) => (
                <Card key={index} className='mb-3 mx-auto w-50'>
                    <Card.Body>
                        <Card.Title>{questionNo++ + 1}) {question.questionTitle}</Card.Title>
                        <Form>
                            {Object.keys(question).map((key) => {
                                if (key.startsWith('option')) {
                                    return (
                                        <Form.Check
                                            key={key}
                                            type="radio"
                                            id={`${question.id}-${key}`}
                                            label={question[key]}
                                            name={`${question.id}`}
                                            value={question[key]}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </Form>
                        <div className='mt-3'>
                            <Button variant='warning' onClick={() => { updateQuestion(question.id) }} style={{ 'margin-right': '30px' }}>Update Question</Button>
                            <Button variant='danger' onClick={() => { deleteQuestion(question.id) }} >Delete Question</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
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

export default ViewAllQuestions;