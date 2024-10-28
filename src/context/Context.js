import axios from "axios";
import reducer from "../Reducer/reducer"
import { useEffect, useReducer, createContext, useContext } from "react";

const AppContext = createContext()

// INITIAL DATA //
const initialState = {
    cart: [],
    products: [],
    singleProduct: [],
    shipping_fee: '5',
    totalPrice: ''
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //GET ALL PRODUCT//
    const getProduct = async () => {
        const API = "https://fakestoreapi.com/products"
        try {
            const res = await axios.get(API)
            const products = await res.data
            dispatch({ type: "MY_API_PRODUCT", payload: products })
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getProduct()
    }, [])

    // SINGLE PRODUCT//
    const getSingleProduct = async (url) => {

        try {
            const res = await axios.get(url)
            const singleProduct = await res.data
            dispatch({ type: "MY_SINGLE_PRODUCT", payload: singleProduct })
        } catch (error) {
            console.log(error)
        }

    }

    // INC / DEC / ADD TO CART
    const setIncrement = (id) => {
        dispatch({ type: "INCREMENT", payload: id })
    }

    const setDecrement = (id) => {
        dispatch({ type: "DECREMENT", payload: id })
    }

    const AddtoCart = (id, image, category, price, title, quantity) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, image, category, price, title, quantity } })
    }

    //REMOVE ITEMS
    const setRemove = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    }

    //REMOVE ALL ITEM
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    // Totle Cart //
    useEffect(() => {
        dispatch({ type: "CART_TOTLE_PRICE" })
    }, [state.cart])

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct, AddtoCart, setIncrement, setDecrement, setRemove, clearCart }}>
            {children}
        </AppContext.Provider>
    )

}

// CUSTOM HOOK //
const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppProvider, useGlobalContext, AppContext }