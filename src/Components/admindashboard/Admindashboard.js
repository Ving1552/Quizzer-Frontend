import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { selectAdmin, selectIsAdminLoggedIn } from '../../redux/slices/Adminslice';

function Admindashboard() {
    const admin = useSelector(selectAdmin);
    const loggedIn = useSelector(selectIsAdminLoggedIn);
    const navigate = useNavigate();

    const createQuiz = () => {
      navigate('/createQuiz');
    }

    const viewAllQuestions = () => {
      navigate('/viewAllQuestions');
    }

  return (
    <div>
      {
        (loggedIn === true) ?
          (
            <div>
              <h2 className='text-center heading-2'>Welcome, {admin.username}!</h2>
              <br />
              <div className='text-center'>
                <Button variant='dark' onClick={createQuiz} style={{'margin-right' : '30px'}}>Create Quiz</Button>
                <Button variant='dark' onClick={viewAllQuestions} >View All Questions</Button>
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

export default Admindashboard;