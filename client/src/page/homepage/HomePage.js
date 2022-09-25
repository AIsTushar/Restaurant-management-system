import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../urls";
import "./homePage.scss";

import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate();
    var axios = require("axios");

    const [foodType, setType] = useState([]);
    const [topFood, setTopFood] = useState([]);

    useEffect(() => {
        getFoodType();
        getTopRated();
    }, []);

    const getFoodType = async () => {
        const res = await axios.get(BASE_URL + "/food/types");
        console.log(res.data);
        setType(res.data);
    };

    const getTopRated = async () => {
        const res = await axios.get(BASE_URL + "/food/top");
        console.log("Top", res.data);
        setTopFood(res.data);
    };

    return (
        <div className="homepage_container">
            <div className="homepage_header">
                <h1>Welcome to</h1>
                <h1>Snack Box</h1>
                <p>
                    Get upto 50% Discoune On your first purchase and explore
                    more places
                </p>
            </div>

            <h1 className="paddingTop20">
                <i className="fa-solid fa-utensils"></i> Available Food Type
            </h1>
            {foodType && (
                <div className="type_food_container">
                    {foodType.map((item, index) => (
                        <div
                            className="food_type"
                            key={index}
                            onClick={() => {
                                navigate(`/food/${item}`);
                            }}
                        >
                            <h1>{item}</h1>
                        </div>
                    ))}
                </div>
            )}

            <h1 className="paddingTop20">
                <i className="fa-solid fa-carrot"></i> Top Rated Foods{" "}
            </h1>

            {topFood && (
                <div className="top_food_container">
                    {topFood.map((item, index) => (
                        <div className="top_food" key={index}>
                            {item.images && <img src={item.images[0]} alt="" />}

                            {/* {item.images.map((image, index) => (
                                <img src={image} alt="" key={index} />
                            ))} */}
                            <div className="desc_container">
                                <h2>{item.name}</h2>
                                <h2>{item.rating}⭐</h2>
                             
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h1 className="paddingTop20">Top Rated Foods</h1>
        </div>
    );
}
