import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsUserLoggedIn, selectUserRequestedQuiz, userScore } from '../../redux/slices/Userslice';

function PlayQuiz() {
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const selectedQuiz = useSelector(selectUserRequestedQuiz);
    const loggedIn = useSelector(selectIsUserLoggedIn);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionId]: option,
        });
    };

    const fetchData = async () => {
        await axios.get(`https://enthusiastic-mercy-production.up.railway.app/quiz/getQuiz/${selectedQuiz}`)
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((error) => {
                if(error)
                alert("Something went wrong");
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = () => {
        const selectedOptionsList = Object.entries(selectedOptions).map(([questionId, response]) => ({
            id: parseInt(questionId),
            response: response
        }));

        axios.post(`https://enthusiastic-mercy-production.up.railway.app/quiz/submitResponses`, selectedOptionsList)
            .then((response) => {
                dispatch(userScore(response.data));
            })
            .catch(error => {
                alert('Something went wrong:');
            });
        navigate('/scorePage');
    };

    return (
        <div>
            {
                (loggedIn === true) ?
                    (
                        <div >
                            <div>
                                <h2 className='mt-5 text-center'>{selectedQuiz}</h2>
                                {questions.map((question, index) => (
                                    <Card key={index} className='mb-3 mx-auto w-50'>
                                        <Card.Body>
                                            <Card.Title>{index + 1}) {question.questionTitle}</Card.Title>
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
                                                                onChange={() => handleOptionChange(question.id, question[key])}
                                                                checked={selectedOptions[question.id] === question[key]}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <div className='text-center mt-5'><Button onClick={handleSubmit} variant='success'>Submit</Button></div>

                            </div>
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

export default PlayQuiz;