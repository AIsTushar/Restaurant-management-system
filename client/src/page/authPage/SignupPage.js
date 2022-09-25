import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import logoSvg from "../../media/logo.svg";

export default function SignupPage() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
    });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (
            !credentials.username ||
            !credentials.password ||
            !credentials.email
        ) {
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/register",
                credentials
            );
            navigate("/login");
            console.log("response", response);
        } catch (err) {
            console.log("err", err);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginHeader">Sign Up</div>
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
                        <input
                            type="text"
                            placeholder="Name"
                            className="input"
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
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

                    <div className="btn" onClick={handleSignup}>
                        LOG IN
                    </div>
                    <div onClick={() => navigate("/login")} className="nav">
                        Go To Login Page
                    </div>

                    <div onClick={() => navigate("/")} className="nav">
                        Go To Home Page
                    </div>
                </div>
            </div>
        </div>
    );
}
