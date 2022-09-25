import React, { useContext } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import "./gluePage.scss";
import logoSvg from "../../../media/logo.svg";
import { AuthContext } from "../../../context/AuthContext";

const GluePage = () => {
    const navigate = useNavigate();

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <div className="gluePage_container">
            <div className="gluePage_Header">
                <div className="gluePage_Header_left">
                    <div
                        className="gluePage_Header_left_logo"
                        onClick={() => navigate("/")}
                    >
                        Snack Box
                    </div>
                </div>
                {!user ? (
                    <div className="gluePage_Header_right">
                        <div
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign up
                        </div>
                        <div
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log in
                        </div>
                    </div>
                ) : (
                    <div className="gluePage_Header_right">
                        <div
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            {user.email}
                        </div>
                        <div
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            Log out
                        </div>
                    </div>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default GluePage;
