import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Table, Col, Container, Row, CardHeader } from 'reactstrap';
import FormBid from './Form';
import Foot from '../Footer/Foot';

export default function Seller() {
  const [products, setProducts] = useState([]);
  const [bidProducts, setBidProducts] = useState([]);
  const [seller, setSeller] = useState({ id: 1 });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchBidProducts();
  }, [seller.id]);

  const fetchProducts = () => {
    if (seller.id) {
      axios.get(`http://localhost:3002/api/seller/get_products/${seller.id}`)
        .then((res) => {
          setProducts(res.data);
        }).catch((err) => {
          alert(err);
        });
    }
  };

  const fetchBidProducts = () => {
    if (seller.id) {
      axios.get(`http://localhost:3002/api/seller/get_bid_products/${seller.id}`)
        .then((res) => {
          setBidProducts(res.data);
        }).catch((err) => {
          alert(err);
        });
    }
  };

  const toggle = () => setModal(!modal);

  return (
    <>
      <Container style={{ minHeight: '50vh', paddingTop: '20px' }}>
        <div className='bg'>
          <div className="row mb-3">
            <Row md='12'>
              <div>              
                <Col md='5'>
                  <Card>
                    <CardBody>
                      <Button color="primary" onClick={toggle} className='add'>Add Product</Button>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <Button value="Request Report" className='report' color="primary">Request Report</Button>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </Row>
          </div>

          <div>
            <Row md='12'>
              <Col md='6'>
                <Card>
                  <CardHeader> 
                    <h5>Direct Selling Product List</h5>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      {products.length !== 0 && (
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {products.length !== 0 && products.map((product) => (
                          <tr key={product.product_id}>
                            <td>{product.name}</td>
                            <td>00{product.product_id}</td>
                            <td>{product.amount}</td>
                            <td>{product.admin_status}</td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr>
                            <td colSpan="4">No products available</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col md='6'>
                <Card>
                  <CardHeader>
                    <h5>Bid Product List</h5>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      {bidProducts.length !== 0 && (
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Base Price</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {bidProducts.length !== 0 && bidProducts.map((bid_product) => (
                          <tr key={bid_product.product_id}>
                            <td>
                              <Link to={`/seller-bid`}>
                                {bid_product?.product.name}
                              </Link>
                            </td>
                            <td>00{bid_product?.product.product_id}</td>
                            <td>{bid_product.base_price}</td>
                            <td>{bid_product.status}</td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr>
                            <td colSpan="4">No products available</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Product</ModalHeader>
            <ModalBody>
              <FormBid onSuccess={fetchProducts} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
      <Foot/>
    </>
  );
}
