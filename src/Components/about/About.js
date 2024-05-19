import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function About() {
  return (
    <div>
      <Container className="mt-5">
      <Row>
        <Col>
          <h2>About Us</h2>
          <p>Welcome to our quiz website! We provide a platform for users to test their knowledge on various topics.</p>
          <p>Connect with us on social media:</p>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mr-2">
              <FaFacebook size={32} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mr-2">
              <FaTwitter size={32} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={32} />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default About;