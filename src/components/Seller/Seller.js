import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Table, Col, Container, Row } from 'reactstrap';
import FormBid from './Form'; // Ensure this path is correct
import Foot from '../Footer/Foot';

export default function Seller() {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({ id: 1 }); // Initial seller ID
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchProducts(); // Fetch products initially when component mounts
  }, [seller.id]); // Fetch products when seller ID changes

  // Function to fetch products based on seller ID
  const fetchProducts = () => {
    if (seller.id) {
      axios.get(`http://localhost:3002/api/seller/get_products/${seller.id}`)
        .then((res) => {
          setProducts(res.data);
        }).catch((err) => {
          alert(err); // Display error if fetching fails
        });
    }
  };

  // Function to toggle the modal
  const toggle = () => setModal(!modal);

  return (
    <>
      <Container style={{ minHeight: '50vh', paddingTop: '20px' }}>
        <div className='bg'>
          {/* Row for buttons */}
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

          {/* Row for product table */}
          <div >
            <div>
              <Card>
                <CardBody>
                  <Table>
                    {/* Table headers */}
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
                      {/* Render products if available */}
                      {products.length !== 0 && products.map((product) => (
                        <tr key={product.product_id}>
                          <td>{product.name}</td>
                          <td>00{product.product_id}</td>
                          <td>{product.amount}</td>
                          <td>{product.admin_status}</td>
                        </tr>
                      ))}
                      {/* Display message if no products available */}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan="4">No products available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Modal for adding product */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Product</ModalHeader>
            <ModalBody>
              {/* Render the FormBid component inside the modal */}
              <FormBid onSuccess={fetchProducts} /> {/* Pass onSuccess callback to update products after adding */}
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
