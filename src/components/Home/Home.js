import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import NavHome from '../NavBar/NavHome';
import Foot from '../Footer/Foot';

export default function Home() {
  return (
    <div>
      <NavHome />
      <Container style={{ minHeight: '50vh', paddingTop: '20px' }}>
        <Row className="mb-4">
          <Col lg="6">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Do you want to buy?</CardTitle>
                <Link to="/customer-bid">
                  <Button color="primary">Customer</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Do you want to sell?</CardTitle>
                <Link to="/seller">
                  <Button color="primary">Seller</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Foot />
    </div>
  );
}





