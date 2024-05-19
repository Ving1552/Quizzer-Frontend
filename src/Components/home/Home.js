import React from 'react';
import './Home.css'
import homeimg from '../../images/homeimg.svg'
import { Col, Container, Row } from 'react-bootstrap';

function Home() {
  return (
    <div className='mx-auto d-block'>
      <Container className='mt-5'>
        <Row>
          <Col style={{ marginTop: '11rem' }}>
            <Row>
              <h2 className='hometxt'>Test your cognitive skills, take a quiz now!</h2>
              <h4>Unravel the fun and test your knowledge with our captivating quizzes!</h4>
            </Row>
          </Col>
          <Col style={{ marginTop: '7rem' }}><img className="homeimg" src={homeimg} alt="" /></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home