import React, { useState } from 'react'
import './Form.css'
import './Button/Button.css'
import BidForm from './BidForm'
import DirectForm from './DirectForm'
import NavHome from '../NavBar/NavHome'

export default function FormBid() {
  const [showBidForm, setShowBidForm] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productDescription, setProductDescription] = useState("")

  const handleYesClick = () => {
    setShowBidForm(true);
    setShowDirectForm(false);
  };

  const handleNoClick = () => {
    setShowBidForm(false);
    setShowDirectForm(true);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Limit the number of photos to 5
    if (selectedFiles.length > 5) {
      alert('You can upload up to 5 photos only');
      return;
    }

    // Append new photos to the existing photos array
    setPhotos([...photos, ...selectedFiles]);
  };

  function addProduct(){
    alert("hello")
  }

  return (
  <>
    <div>
        <form method='get' id='productform'>
        <table border="0" className="table">
          <tr className="table-row">
            <th>Product Name</th>
            <td className="table-cell"> <input type="text" id="name" required onChange={(e)=>{setProductName(e.target.value)}}/></td>
          </tr>

          <tr className="table-row">
            <th>Description </th>
            <td className="table-cell"><textarea  id="description" required onChange={(e)=>{setProductDescription(e.target.value)}}></textarea></td>
          </tr>
          <tr className="table-row">
            <th>Insert Photos of product 
            </th>
            <td>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {/* Display the selected photos */}
              <ul>
                {photos.map((photo, index) => (
                  <li key={index}>{photo.name}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr className="table-row">
            <th>
              Do you want to bid your product?
            </th>
            <td>
            <input
                  type='button'
                  name='No'
                  value='No'
                  color="primary"
                  className='button'
                  onClick={handleNoClick}
                />
              <input
                  type='button'
                  name='Yes'
                  value='Yes'
                  color="primary"
                  className='button'
                  onClick={handleYesClick}
                />
            </td>
          </tr>

          {showBidForm && (
            <tr>
              <td colSpan={2}>
                <BidForm params={productDescription} pname={productName}/>
              </td>
            </tr>
          )}
          {showDirectForm && (
            <tr>
              <td colSpan={2}>
                <DirectForm params={productDescription} pname={productName}/>
              </td>
            </tr>
          )}
          
        </table>
      </form>
    </div>
    </>
  )
}
