import { Outlet, NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import { FaCartShopping } from "react-icons/fa6";
import "./Header.scss"
function Header() {
    const { cart } = useGlobalContext()
    return (
        <>
            <header>
                <div className="navbar">
                    <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
                        <h1>One<i className="fa-brands fa-opencart"></i>Mart</h1>
                    </NavLink>
                    <NavLink to='/additem' style={{ textDecoration: "none", color: "#fff", fontSize: "bold" }}>
                        <span className='cart_icon'><FaCartShopping /><p className='qty'>{cart.length}</p></span>
                    </NavLink>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Header