import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../assets/images/logo.svg'; 
import '../assets/css/home.css'; 

const Home = () => {
  return (
    <Container className="text-center">
      <Row className="justify-content-center">
        <Col md={6} className="mt-5">
          <Image src={logo} alt="Rodud React.js website Logo" fluid />
          <h1 className="mt-3">Rodud React.js website</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
