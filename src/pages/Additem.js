import React from 'react'
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGlobalContext } from '../context/Context'
import { NavLink } from 'react-router-dom';
import FormatPrice from '../helpers/Formatprice';
import './Additem.scss'

function Additem() {
    const { cart, setIncrement, setDecrement, setRemove, clearCart, total_Price, shipping_fee } = useGlobalContext()
    return (
        <div className="cart_Item_Container">
            <div className="cartTitle">
                <h1>Shopping Cart </h1>
            </div>
            <div className="cartNaming">
                <p>ITEMS ({cart.length})</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
                <p>REMOVE</p>
            </div>
            {cart.map((curElem) => {
                const { image, price, quantity, id } = curElem
                return (
                    <div className="cartItemslist" key={id}>
                        <img src={image} alt="" />
                        <div className="cartDetail">
                            <p><FormatPrice price={price} /></p>
                            <div style={{ display: 'Flex', }}>
                                <button className='addBtn'  ><i className="fa-solid fa-plus" onClick={() => setIncrement(id)}></i></button>
                                <p className='qty'>{quantity}</p>
                                <button className='addBtn'><i className="fa-solid fa-minus" onClick={() => setDecrement(id)} ></i></button>
                            </div>
                            <p><FormatPrice price={price * quantity} /></p>
                            <button className='addRemove' onClick={() => setRemove(id)}><MdDelete />
                            </button>
                        </div>
                    </div>
                )
            })}
            <div className="cartFlex" style={{ display: "Flex", margin: "1.7rem 0 0 0", justifyContent: "space-between" }}>
                <NavLink to={'/'} style={{ textDecoration: "none" }}>
                    <div className="addBack">
                        <button className='continueBtn'>Continue Shopping</button>
                    </div>
                </NavLink>
                {cart.length >= 1 ? <div className="cartTotal">
                    <span>Subtotal:</span>
                    <p><FormatPrice price={total_Price} /></p>
                    <span className='p'>Shipping Fee:</span>
                    <hr />
                    <p><FormatPrice price={shipping_fee} /></p>
                    <span>Total Order:</span>
                    <p><FormatPrice price={total_Price + shipping_fee} /></p>
                    <button className='clearBtn' onClick={clearCart}>CLEAR CART <span> <RiDeleteBin6Line /></span>
                    </button>
                </div> : null}
            </div>
        </div>
    )
}

export default Additem
