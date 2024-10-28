import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import FormatPrice from '../helpers/Formatprice'
import './Card.scss'
function Card() {
    const { id } = useParams()
    const { getSingleProduct, singleProduct, AddtoCart } = useGlobalContext()
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        getSingleProduct(`https://fakestoreapi.com/products/${id}`)
    }, [id])
    const {
        image,
        category,
        price,
        title,
        description,
    } = singleProduct
    return (
        <div className='cart_Wrapper'>
            <img src={image} alt="" />
            <div className="detail">
                <p className='cartTitle'>{title}</p>
                <p className='cartPrice'><span><FormatPrice price={price} /></span></p>
                <p className='description'>{description}</p>
                <div className="cartdetails">
                    <NavLink to={`/additem`}>
                        <button className='cart_btn' onClick={() => AddtoCart(id, image, category, price, title, quantity)}>ADD TO CART</button>
                    </NavLink>
                    <div className='cartQuantity'>
                        <button onClick={() => setQuantity(quantity + 1)}><i className="fa-solid fa-plus" ></i>
                        </button>
                        <span className='qty'>{quantity}</span>
                        <button onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}><i className="fa-solid fa-minus" ></i>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Card