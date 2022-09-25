import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../urls";
import "./foodList.scss";

import CartContext from "../../context/CartContext";
import { loadStorage } from "../../persistLocalStorage";

export default function FoodList() {
    const {
        items,
        addToCart,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useContext(CartContext);

    const navigate = useNavigate();
    var axios = require("axios");
    const foodSelectedType = window.location.pathname.split("/")[2];
    const [food, setFood] = useState([]);
    const [foodType, setType] = useState([]);

    console.log(items);

    useEffect(() => {
        if (foodType) {
            getFoodByType();
        }
        // getAllFood();
    }, []);

    const getFoodByType = async () => {
        const res = await axios.get(
            BASE_URL + "/food/type/" + foodSelectedType
        );
        console.log(res.data);
        setFood(res.data);
    };

    const getAllFood = async () => {
        const res = await axios.get(BASE_URL + "/food");
        console.log(res.data);
        setFood(res.data);
    };
    const getFoodType = async () => {
        const res = await axios.get(BASE_URL + "/food/types");
        console.log(res.data);
        setType(res.data);
    };

    const sortFoodByPrice = () => {
        const sortedFood = [...food].sort((a, b) => a.price - b.price);
        setFood(sortedFood);
    };

    const sortFoodByRating = () => {
        const sortedFood = [...food].sort((a, b) => b.rating - a.rating);
        setFood(sortedFood);
    };

    const handleChackout = () => {
        const userData = loadStorage("user");

        try {
            var data = JSON.stringify({
                userid: userData._id,
                orderItems: items,
                shippingAddress: {
                    address: "Dhaka",
                },
                paymentMethod: "Cash on Delivery",
            });

            var config = {
                method: "post",
                url: "http://localhost:8000/api/order",
                headers: {
                    token: userData.token,
                    id: userData._id,
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigate("/profile");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="foodlist_container">
            <div className="top_search_container">
                <button
                    className="search_btn"
                    onClick={() => {
                        sortFoodByRating();
                    }}
                >
                    Sort By Rating{" "}
                </button>

                <button
                    className="search_btn"
                    onClick={() => {
                        sortFoodByPrice();
                    }}
                >
                    Sort By Price
                </button>

                <button
                    className="search_btn"
                    onClick={() => {
                        getAllFood();
                    }}
                >
                    Show All
                </button>
            </div>
            <div className="body_container">
                <div className="food_list_container">
                    {food.map((item, index) => (
                        <div className="search_item" key={index}>
                            {item.images && <img src={item.images[0]} alt="" />}
                            <div className="flex1">
                                <h1>{item.name}</h1>
                                <h2>{item.price}৳</h2>
                                <p className="desc_holder">
                                    {item.description}
                                </p>
                                {item.isAvailable ? (
                                    <p>✔️ Available Now</p>
                                ) : (
                                    <p>Not Available</p>
                                )}
                                <p>
                                    <i className="fa-solid fa-burger"></i>
                                    {item.type}
                                </p>
                            </div>
                            <div className="flexH1">
                                <h2>
                                    {item.rating}
                                    <i className="fa-solid fa-star"></i>
                                </h2>

                                <button
                                    className="btn"
                                    onClick={() => {
                                        navigate(`/food/${item._id}`);
                                    }}
                                >
                                    View
                                </button>

                                <button
                                    className="btn cart_btn"
                                    onClick={() => {
                                        addToCart(
                                            item._id,
                                            item.name,
                                            item.price,
                                            item.images[0],
                                            1
                                        );
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart_container">
                    <div className="cart_holder">
                        <h1>
                            <i className="fa-solid fa-cart-shopping"></i>Cart
                        </h1>

                        {items?.map((item, index) => (
                            <div className="cart_item" key={index}>
                                <img src={item.image} alt="" />

                                <p
                                    style={{
                                        width: "100px",
                                        textAlign: "left",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.name}
                                </p>
                                <p>{item.price}৳</p>

                                <div>
                                    <button
                                        className="quantity_btn"
                                        onClick={() => {
                                            increaseQuantity(item.id);
                                        }}
                                    >
                                        +
                                    </button>

                                    {item.quantity}
                                    <button
                                        className="quantity_btn"
                                        onClick={() => {
                                            decreaseQuantity(item.id);
                                        }}
                                    >
                                        -
                                    </button>
                                </div>

                                <button
                                    className="quantity_btn"
                                    onClick={() => {
                                        removeFromCart(item.id);
                                    }}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}

                        {items.length > 0 && (
                            <h3>Total Price : {totalPrice}৳</h3>
                        )}

                        {items.length > 0 && (
                            <button
                                className="checkout_btn"
                                onClick={handleChackout}
                            >
                                Checkout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
