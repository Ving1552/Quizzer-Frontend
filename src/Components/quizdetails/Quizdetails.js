import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Quizdetails() {
  return (
    <Container className="mt-4">
      <h1 className='text-center'>Quiz Details</h1>
      <h5 className='mt-5'>
        Welcome to our quiz website! Here, you can test your knowledge on various topics. Simply login or register, and start testing your knowledge!
      </h5>
      <h3 className='mt-5'>Available Quizzes</h3>
      <ul>
        <li>Java</li>
        <li>Python</li>
        <li>Data Structures and Algorithms (DSA)</li>
      </ul>
      <h4>And many more to come...</h4>
    </Container>
  );
}

export default Quizdetails