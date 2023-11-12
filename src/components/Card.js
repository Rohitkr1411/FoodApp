import React, { useState,useRef,useEffect } from 'react'

import { useCartDispatch, useCart} from './ContextReducer';

export default function Card(props) {

    let options = props.options;

    let dispatch = useCartDispatch();

    let data = useCart();

    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);

    const [size, setSize] = useState("")


    const priceRef = useRef();
    
    
    const handleAddToCart = async () => {
        let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id && item.size===size) {
       food=item;
       
        break;
      }
    } 
  

      if (food.len !==0 && food.size === size) {
       
        await dispatch({ type: "UPDATE", id:  props.foodItem._id, price: parseInt(options[size]), qty: qty,size:size })  
        return 
    }
    else{
      
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price:parseInt(options[size]), qty: qty, size: size })
    return    
}
    }


      useEffect(() => {
        setSize(priceRef.current.value)
      }, [])
    
      let finalPrice = qty * parseInt(options[size]);
   
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>

                    <div className="container h-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{ setQty(parseInt(e.target.value))}} >
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                }
                                )
                            }
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}} >
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })

                            }

                        </select>

                        <div className='d-block fs-5 h-100'>
                          Price:  ${finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>

                </div>
            </div>
        </div>
    )
}
