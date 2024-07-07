import axios from 'axios';
import React, {useState} from 'react'

export default function DirectForm({params , pname}) {
  const[unitPrice, setUnitPrice] = useState(0);
  const[quantity, setQuantity] = useState(0);

  const seller = {
    id : 2
  }

  function addProduct_(){
    axios.post("http://localhost:3002/api/seller/add_selling_product",{
        name:pname,
        description:params,
        amount:quantity,
        seller_id:seller.id,
        price:unitPrice
    }).then((res)=>{
      console.log(res.data)
      alert(res.data)
      
    }).catch((err)=>{
      alert(err)
    })
}

  return (
    <div>
        <form method='get'>
        <table border="0" className="table">
          <tr className="table-row">
          <th>Unit Price (LKR)</th>
            <td className="table-cell">
              <input type="number"  onChange={(e)=>{setUnitPrice(e.target.value)}}/>
            </td>
          </tr>
          <tr className="table-row">
            <th>Quantity</th>
            <td className="table-cell"><input type="number" required onChange={(e)=>{setQuantity(e.target.value)}}/></td>
          </tr>
          <tr className="table-row">
            <td></td>
            <td className="table-cell" colSpan="2" align="right"> 
              <input type="reset" name="Cancel" value="Cancel" className='button'/>
              <input type="submit" name="Submit" value="Submit" className='button' onClick={addProduct_}/>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
