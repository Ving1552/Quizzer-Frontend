import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import './Header.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../home/Home';
import Quizdetails from '../quizdetails/Quizdetails';
import About from '../about/About';
import Userdashboard from '../userdashboard/Userdashboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoggedIn, selectUser, userLogout } from '../../redux/slices/Userslice';
import { selectIsAdminLoggedIn, selectAdmin, adminLogout } from '../../redux/slices/Adminslice';
import ScorePage from '../quiz/ScorePage';
import PlayQuiz from '../quiz/PlayQuiz';
import UserLogin from '../login/UserLogin';
import AdminLogin from '../login/AdminLogin';
import LoginMiddleware from '../login/LoginMiddleware';
import Admindashboard from '../admindashboard/Admindashboard';
import CreateQuiz from '../quiz/CreateQuiz';
import ViewAllQuestions from '../questions/ViewAllQuestions';
import AddQuestion from '../questions/AddQuestion';
import UpdateQuestion from '../questions/UpdateQuestion';
import SignupMiddleware from '../signup/SignupMiddleware';
import UserSignup from '../signup/UserSignup';
import AdminSignup from '../signup/AdminSignup';

const Header = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);
  const user = useSelector(selectUser);
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performAdminLogout = () => {
    dispatch(adminLogout());
    navigate('/loginmiddleware');
  }

  const performUserLogout = () => {
    dispatch(userLogout());
    navigate('/loginmiddleware');
  }

  return (
    <div>
      <Navbar>
        <Container>
          <Link to="/" className='navbar-items'>
            <Navbar.Brand className='title'>Quizzer</Navbar.Brand>
          </Link>
          <Nav className="m-auto navbar-items">
            <Link to="/home" className='navbar-items'>Home</Link>
            <Link to="/quizdetails" className='navbar-items'>Quiz Details</Link>
            <Link to="/about" className='navbar-items'>About</Link>
          </Nav>
          {(isUserLoggedIn !== true && isAdminLoggedIn !== true) ?
            (
              <>
                <Link to='/signupMiddleware'><Button variant="dark" className='register-button'>Register</Button></Link>
                <Link to='/loginMiddleware'><Button variant="dark">Login</Button></Link>
              </>)
            :
            (
              (isUserLoggedIn) ?
                (
                  <div className='username'>
                    <Link to={'/userdashboard'} style={{'margin-right' : '15px'}}>{user.username}</Link>
                    <Button variant="dark" onClick={performUserLogout}>Logout</Button>
                    </div>
                )
                :
                (
                  <div className='username'>
                    <Link to={'/admindashboard'} style={{'margin-right' : '15px'}}>{admin.username}</Link>
                    <Button variant="dark" onClick={performAdminLogout}>Logout</Button>
                    </div>
                )
            )
          }
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizdetails" element={<Quizdetails />} />
        <Route path="/about" element={<About />} />
        <Route path='/signupMiddleware' element={<SignupMiddleware />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path='/loginMiddleware' element={<LoginMiddleware />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path='/userdashboard' element={<Userdashboard />} />
        <Route path='/admindashboard' element={<Admindashboard />} />
        <Route path='/playQuiz' element={<PlayQuiz />} />
        <Route path='/createQuiz' element={<CreateQuiz />} />
        <Route path='/scorePage' element={<ScorePage />} />
        <Route path='/viewAllQuestions' element={<ViewAllQuestions />} />
        <Route path='/addQuestion' element={<AddQuestion />} />
        <Route path='/updateQuestion' element={<UpdateQuestion />} />
      </Routes>

    </div>
  );
};
export default Header;
