import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import './seller.css';
import NavHome from '../NavBar/NavHome';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNotification } from '../Notification/useNotification';

export default function SellerBid() {
  const [bids, setBids] = useState([]);
  const { selectCustomer } = useNotification();
  const { productId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3002/api/seller/get_bids/${productId}`)
      .then((res) => {
        setBids(res.data);
      }).catch((err) => {
        alert(err);
      });
  }, [productId]);

  const handleSendNotification = (customerId, auctionId) => {
    selectCustomer(customerId, auctionId);
  };

  return (
    <>
      <NavHome />
      <div>
        <Row>
          {bids.length !== 0 && bids.map((bid, index) => (
            <Col md="6" key={index}>
              <Card className='mb-4'>
                <CardBody>
                  <CardTitle tag="h5">Bid {index + 1}</CardTitle>
                  <CardText>Customer ID: {bid.customer_id}</CardText>
                  <CardText>Bid Amount: {bid.bid_amount}</CardText>
                  <Button color="primary" onClick={() => handleSendNotification(bid.customer_id, bid.auction_id)}>Send Notification</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        {bids.length === 0 && <p>No bids available for this product.</p>}
      </div>
      <Footer />
    </>
  );
}
