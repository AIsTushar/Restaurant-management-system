import React, { useContext, useState } from "react";

import "./authPage.scss";
import logoSvg from "../../media/logo.svg";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const navigate = useNavigate();

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        dispatch({ type: "LOGIN_START", payload: credentials });

        if (!credentials.email || !credentials.password) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: "Please enter all fields",
            });
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                credentials
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.message });
            console.log("err", err);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginHeader">Login</div>
            <div className="loginBottom">
                <div className="left">
                    <h1>Welcome To</h1>
                    <div
                        style={{
                            fontSize: "70px",
                            fontWeight: "bold",
                            color: "white",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        Snack Box
                    </div>
                    <p>One place to book any resturent !</p>
                </div>
                <div className="right">
                    <div className="width80">
                        {" "}
                        <input
                            type="text"
                            placeholder="Email"
                            className="input"
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="width80">
                        {" "}
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        disabled={loading}
                        onClick={handleLogin}
                        className="btn"
                    >
                        LOG IN
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => navigate("/signup")}
                        className="nav"
                    >
                        Go To Sign Up
                    </button>

                    <button
                        disabled={loading}
                        onClick={() => navigate("/")}
                        className="nav"
                    >
                        Go To Home Page
                    </button>

                    {error && <span className="error">{error}</span>}
                </div>
            </div>
        </div>
    );
}
