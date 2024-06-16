import React from 'react';
import './ProductDetails.css';
import Product from './Product.js';

function ProductDetails({ id, title, image, price, rating, description }) {
  return (<div className='home_pinfo'>
                <Product
                    id="1234"
                    title="Printer"
                    price={15000.00}
                    rating={4}
                    image="data:image/jpeg;base64,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"
                />
      </div>
      
  );
}

export default ProductDetails;
