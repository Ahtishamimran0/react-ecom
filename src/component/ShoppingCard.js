import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../helpers/Formatprice'
import { useGlobalContext } from '../context/Context'
import "./ShoppingCard.scss"
function ShoppingCard() {
    const { products } = useGlobalContext()
    return (
        <>
            <div className="maintitle">
                <span className='span'>CHECK NOW !</span>
                <h2 className='main'>OUR MOST PRODUCTS</h2>
            </div>
            <div className='products_Wrapper'>
                {products.map((curElem) => {
                    const { title, image, category, id, price } = curElem
                    const newtitle = title.substring(0, 30)
                    return (
                        <NavLink to={`/card/${id}`} style={{ textDecoration: "none", margin: ".8rem .8rem", color: "black" }} key={id}>
                            <div className="product">
                                <img src={image} alt="" />
                                <div className="Product_detail">
                                    <p>{category}</p>
                                    <p><FormatPrice price={price} /></p>
                                    <p>{newtitle.length > 29 ? `${newtitle}...` : newtitle}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
                }
            </div >
        </>
    )
}

export default ShoppingCard

