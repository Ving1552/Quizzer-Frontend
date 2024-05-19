import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn, selectUserScore } from '../../redux/slices/Userslice';
import { Link, useNavigate } from 'react-router-dom';

function ScorePage() {
    const loggedIn = useSelector(selectIsUserLoggedIn);
    const score = useSelector(selectUserScore);
    const navigate = useNavigate();

    const goToUserDashboard = () => {
        navigate('/userdashboard');
    }

    return (
        <div>
            {
                (loggedIn === true) ?
                    (
                        <div>
                            <Card className="text-center mt-5 w-50 mx-auto">
                                <Card.Header>Quiz Result</Card.Header>
                                <Card.Body>
                                    <Card.Title>Your Score : {score}</Card.Title>
                                    <Button variant="primary" onClick={goToUserDashboard}>Go to my dashboard</Button>
                                </Card.Body>
                            </Card>
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

export default ScorePage;