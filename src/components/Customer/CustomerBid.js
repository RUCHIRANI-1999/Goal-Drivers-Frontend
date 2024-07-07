import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Customer.css';
import lap from './Laptop.png';
import NavHome from '../NavBar/NavHome';
import axios from 'axios';
import Foot from '../Footer/Foot';

export default function CustomerBid() {
  const [bidProducts, setBidProducts] = useState([]);
  const [bid, setBid] = useState(0);
  const [seller, setSeller] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyer, setBuyer] = useState({ id: 1 });

  useEffect(() => {
    axios.get("http://localhost:3002/api/buyer/get_products")
      .then((res) => {
        const result = res.data.filter(product => product.product.type === "bid");
        setBidProducts(result);
      }).catch((err) => {
        alert(err);
      });
  }, []);

  function addBid(id) {
    axios.post("http://localhost:3002/api/buyer/add_bid", {
      buyer_id: buyer.id,
      product_id: id,
      bid: bid
    }).then((res) => {
      alert(res.data);
      window.location.reload();
    }).catch((err) => {
      alert(err);
    });
  }

  async function onClick(product) {
    setSelectedProduct(product);
    await axios.get(`http://localhost:3002/api/buyer/get_seller/${product.product.seller_id}`)
      .then((res) => {
        setSeller(res.data[0]);
      }).catch((err) => {
        alert(err);
      });
    setModal(true);
  }

  const toggle = () => setModal(!modal);

  return (
    <>
      <NavHome />
      <Container className="mt-5">
        {bidProducts.length !== 0 && bidProducts.map((product, index) => (
          <div key={index}>
            <Row>
              <Col lg="6" className="mb-4">
                <Card className="mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Bid Details</CardTitle>
                    <CardText>Base Value: Rs.{product.base_price}</CardText>
                  </CardBody>
                </Card>
                <Card className="mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Count Down</CardTitle>
                    <CardText>End At: {product.end_time}</CardText>
                  </CardBody>
                </Card>
                <Card className="mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Place Your Bid Here</CardTitle>
                    <Form inline>
                      <FormGroup>
                        <Label for="bid" className="mr-sm-2">Bid Amount:</Label>
                        <Input type="number" name="bid" id="bid" value={bid} onChange={(e) => setBid(e.target.value)} />
                      </FormGroup>
                      <Button color="primary" onClick={() => addBid(product.product.product_id)}>Submit</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="mb-4">
                <Card className="mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Product Details</CardTitle>
                    <CardText>{product.product.name}</CardText>
                    <CardText>{product.product.description}</CardText>
                    <img src={lap} alt="Product" className="img-fluid" />
                  </CardBody>
                </Card>
                <Button color="secondary" onClick={() => onClick(product)}>Show Seller</Button>
              </Col>
            </Row>
          </div>
        ))}
      </Container>

      {selectedProduct && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Seller's Details</ModalHeader>
          <ModalBody>
            <Card className="mb-3">
              <CardBody>
                <CardTitle tag="h5">Seller's Details</CardTitle>
                <CardText>Name: {seller.firstname} {seller.lastname}</CardText>
                <CardText>Email: {seller.email}</CardText>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      )}
      <Foot/>
    </>
  );
}
