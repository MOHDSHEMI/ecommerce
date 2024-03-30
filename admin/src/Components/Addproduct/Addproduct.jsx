import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {

  const [image,setImage]= useState(false);
  const [productDeatails,setProductDeatails]= useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""

  })

  const Add_Product = async ()=>{
    console.log(productDeatails);
    let responseData;
    let product = productDeatails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      mode: 'cors',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image=responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body :JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert('Product Added'):alert('failed')
      })
    }
  }

  const imageHandler = (e) =>{
       setImage(e.target.files[0]);

  }

  const changeHandler =(e) =>{
    setProductDeatails({...productDeatails,[e.target.name]:e.target.value})
  }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDeatails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Her' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDeatails.old_price} onChange={changeHandler} type="text"  name='old_price' placeholder='Type here'/>
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDeatails.new_price} onChange={changeHandler} type="text"  name='new_price' placeholder='Type here'/>
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDeatails.category} onChange={changeHandler} name="category" className='add-product-selecter'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct