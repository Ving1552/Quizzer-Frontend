import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Userdashboard.css'
import { selectIsUserLoggedIn, selectUser, userRequestedQuiz } from '../../redux/slices/Userslice';
import axios from 'axios';

function Userdashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const loggedIn = useSelector(selectIsUserLoggedIn);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    await axios.get('https://enthusiastic-mercy-production.up.railway.app/quiz/getAllQuizzes')
      .then((res) => {
        setQuizzes(res.data)
      })
      .catch((error) => {
        alert("Something went wrong");
      })
  }

  const playQuizMiddleware = async (quizTitle) => {
    dispatch(userRequestedQuiz(quizTitle));
    navigate('/playQuiz');
  }

  return (
    <div>
      {
        (loggedIn) ?
          (
            <div>
              <h2 className='text-center heading-2'>Welcome, {user.username}!</h2>
              <br />
              <div className='text-center'>
                <h4>Quizzes</h4>
                {quizzes?.map((quiz, index) => (
                  <Card className='mx-auto w-25 mb-5'>
                    <Card.Body>
                      <Card.Title>{quiz.title}</Card.Title>
                      <Button variant="dark" onClick={() => {
                        playQuizMiddleware(quiz.title)
                      }}>Play Quiz</Button>
                    </Card.Body>
                  </Card>
                )
                )
                }
              </div>
            </div>
          )
          :
          (

            <div>
              <h2 className='text-center heading-2'>User logged out</h2>
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

export default Userdashboard;