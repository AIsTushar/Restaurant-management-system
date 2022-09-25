import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    //total number of items
    const [totalItems, setTotalItems] = useState(0);

    //total price of items
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        //set price
        let price = 0;
        items.forEach((item) => {
            price += item.price * item.quantity;
        });
        setTotalPrice(price);

        //set total items
        let total = 0;
        items.forEach((item) => {
            total += item.quantity;
        });
        setTotalItems(total);

        console.log("Total items: " + totalItems + " items");
        console.log("Total price: " + totalPrice + " items");
    }, [items]);

    const addToCart = (id, name, price, image, quantity) => {
        //if item already exists
        const itemExists = items.find((item) => item.id === id);
        if (!itemExists) {
            const item = {
                id,
                name,
                price,
                image,
                quantity,
            };
            setItems([...items, item]);

            setTotalItems(totalItems + 1);
        } else {
            increaseQuantity(id);
        }
    };

    const decreaseQuantity = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            } else if (item.id === id && item.quantity === 0) {
                removeFromCart(id);
                console.log("totalItems: " + item.quantity);
            }
            return item;
        });
        setItems(newItems);
    };

    const removeFromCart = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        setTotalItems(totalItems - 1);
    };

    const clearCart = () => {
        setItems([]);
    };

    const increaseQuantity = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id && item.quantity < 10) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setItems(newItems);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
