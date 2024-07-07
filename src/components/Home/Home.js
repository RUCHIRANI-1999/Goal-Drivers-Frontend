import React from 'react';
import { Link } from 'react-router-dom';
import NavHome from '../NavBar/NavHome';
import Foot from '../Footer/Foot';

export default function Home() {
  return (
    <div>
      <NavHome />
      <Container style={{ minHeight: '70vh' }} className="d-flex align-items-center justify-content-center">
        <Row>
          <Col md="6" className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaUser size={50} className="mb-3" />
                <Card.Title>Customer</Card.Title>
                <Link to='/customer-bid'>
                  <Button color="primary">Go to Customer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <FaStore size={50} className="mb-3" />
                <Card.Title>Seller</Card.Title>
                <Link to='/seller'>
                  <Button color="secondary">Go to Seller</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Foot />
    </div>
  );
}




