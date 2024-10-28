const ProductReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let { id, image, category, price, title, quantity } = action.payload

            // TACKLE THE EXISTING PRODUCT        
            let existingProduct = state.cart.find((curItem) =>
                curItem.id === id
            )
            if (existingProduct) {
                let updatedProduct = state.cart.map((curElem) => {
                    if (curElem.id === id) {
                        let newAmount = curElem.quantity + quantity
                        return {
                            ...curElem,
                            quantity: newAmount
                        }
                    } else {
                        return curElem
                    }
                })
                return {
                    ...state,
                    cart: updatedProduct
                }
            } else {
                let cartProduct = {
                    id,
                    image,
                    category,
                    price,
                    title,
                    quantity
                }
                return {
                    ...state,
                    cart: [...state.cart, cartProduct]
                }
            }
        }

        // Cart Total Price //
        case "CART_TOTLE_PRICE": {
            let total_Price = state.cart.reduce((initialval, curElem) => {
                let { price, quantity } = curElem
                initialval = initialval + price * quantity
                return initialval
            }, 0)
            return {
                ...state,
                total_Price
            }
        }

        //Increment //
        case "INCREMENT": {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                    let newAmount = curElem.quantity + 1
                    if (newAmount >= 6) {
                        newAmount = 6
                    }
                    return {
                        ...curElem,
                        quantity: newAmount,
                    }
                } else {
                    return curElem
                }
            })
            return {
                ...state,
                cart: updatedProduct
            }
        }

        //Decrement//
        case "DECREMENT": {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                    let decAmount = curElem.quantity - 1
                    if (decAmount <= 1) {
                        decAmount = 1
                    }
                    return {
                        ...curElem,
                        quantity: decAmount,
                    }
                } else {
                    return curElem;
                }
            })
            return {
                ...state,
                cart: updatedProduct
            }
        }

        //Remove //
        case "REMOVE_ITEM": {
            let removeProduct = state.cart.filter((curElem) =>
                curElem.id !== action.payload
            )
            return {
                ...state,
                cart: removeProduct
            }
        }

        //Clear cart//
        case "CLEAR_CART": {
            return {
                ...state,
                cart: []
            }
        }

        //All Products //
        case "MY_API_PRODUCT": {
            return {
                ...state,
                products: action.payload
            }
        }

        // Single Product//
        case "MY_SINGLE_PRODUCT": {
            return {
                ...state,
                singleProduct: action.payload
            }
        }
    }
    return state;
}
export default ProductReducer