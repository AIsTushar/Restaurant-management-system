import React, { useEffect, useState } from "react";
import { loadStorage } from "../../persistLocalStorage";
import { BASE_URL } from "../../urls";
import "./userProfile.scss";

export default function UserProfile() {
    const [userData, setUserData] = useState([]);
    const [editProfile, setEditProfile] = useState(false);

    const [file, setFile] = useState("");
    const [updateInfo, setUploadInfo] = useState({});

    const [orders, setOrders] = useState([]);
    const [ordersItems, setOrdersItems] = useState([]);

    var axios = require("axios");

    console.log("userData", userData);

    useEffect(() => {
        var axios = require("axios");
        init_user();
        getOrders();
    }, []);

    const init_user = async () => {
        const userData = loadStorage("user");
        var data = JSON.stringify({
            token: userData.token,
        });

        var config = {
            method: "post",
            url: "http://localhost:8000/api/auth/user",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setUserData(response.data);
                console.log("respone", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getOrders = async () => {
        const user = loadStorage("user");

        var config = {
            method: "get",
            url: `http://localhost:8000/api/order/find/${user._id}`,
            headers: {
                token: user.token,
            },
        };

        axios(config)
            .then(function (response) {
                console.log("orders", response.data);
                setOrders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setUploadInfo({
            ...updateInfo,
            [e.target.name]: e.target.value,
        });

        console.log("updated info", updateInfo);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const userData = loadStorage("user");
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            try {
                const uploadResponse = await axios.post(
                    "https://api.cloudinary.com/v1_1/ewu/image/upload",
                    data
                );
                console.log("uploadResponse", uploadResponse);

                const { url } = uploadResponse.data;

                var updateData = JSON.stringify({
                    ...updateInfo,
                    token: userData.token,
                    image: url,
                    _id: userData._id,
                });

                console.log("updateData", updateData);

                var config = {
                    method: "post",
                    url: "http://localhost:8000/api/auth/updateUser",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: updateData,
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                var updateData = JSON.stringify({
                    ...updateInfo,
                    token: userData.token,
                    _id: userData._id,
                });

                console.log("updateData", updateData);

                var config = {
                    method: "post",
                    url: "http://localhost:8000/api/auth/updateUser",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: updateData,
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        }
        init_user();
    };

    return (
        <div className="userProfile_component">
            <h1>User Profile</h1>

            <div className="user-profile">
                <div className="user-profile__image">
                    {userData.image ? (
                        <img src={userData.image} alt="user" />
                    ) : (
                        <img
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="user"
                        />
                    )}
                </div>
                <div className="user_profile__image__name">
                    <h2>{userData.username}</h2>
                    <p>{userData.email}</p>
                    {userData.phoneNumber && <p>{userData.phoneNumber}</p>}
                    {userData.address && <p>{userData.address}</p>}
                    {userData.city && <p>{userData.city}</p>}
                    {userData.isAdmin && <p>✔️Admin</p>}
                </div>

                <div className="actionContainer">
                    <button
                        className="actionContainer__button"
                        onClick={() => setEditProfile(!editProfile)}
                    >
                        <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>
            {editProfile && (
                <div className="user_edit_profile">
                    <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="User Name"
                        value={updateInfo.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={updateInfo.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={updateInfo.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={updateInfo.address}
                        onChange={handleChange}
                    />

                    <button type="submit" onClick={handleEdit}>
                        update
                    </button>
                </div>
            )}
            <h2>Orders</h2>
            <div className="user_orders">
                <div className="user_orders_left">
                    {orders.map((order, index) => (
                        <div
                            className="user_orders__order"
                            key={index}
                            onClick={() => setOrdersItems(order.orderItems)}
                        >
                            <div className="user_orders__order__info">
                                <p>
                                    <i className="fa-solid fa-cart-shopping"></i>{" "}
                                    User ID: {order.userid}
                                </p>
                                <p>
                                    <i className="fa-solid fa-cart-shopping"></i>{" "}
                                    Order ID: {order._id}
                                </p>
                                <p>
                                    <i className="fa-regular fa-calendar-days"></i>{" "}
                                    Order Date: {order.createdAt}
                                </p>
                                <p>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    address:
                                    {order.shippingAddress.address}
                                </p>
                                <p>
                                    <i className="fa-brands fa-cc-visa"></i>{" "}
                                    payment Method:{order.paymentMethod}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="user_orders_right">
                    <h2>Order Items</h2>
                    {ordersItems.map((item, index) => (
                        <div className="user_orders__order__items" key={index}>
                            <img src={item.image} alt="item" />
                            <div>
                                <p>Item Name : {item.name}</p>
                                <p>Item Quantity : {item.quantity}</p>
                                <p>Item Price : {item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
