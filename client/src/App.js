import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/authPage/LoginPage";
import SignupPage from "./page/authPage/SignupPage";
import GluePage from "./page/common/dashboard/GluePage";
import HomePage from "./page/homepage/HomePage";
import FoodList from "./page/foodPages/FoodList";
import { CartContextProvider } from "./context/CartContext";
import UserProfile from "./page/userProfilePage/UserProfile";
import AdminPage from "./page/adminPage/AdminPage";

function App() {
    return (
        <div className="App">
            <CartContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<GluePage />}>
                            <Route index element={<HomePage />} />
                            <Route path="/food/:type" element={<FoodList />} />
                            <Route
                                path="/food/:id"
                                element={<div>Hotel</div>}
                            />
                            <Route path="/profile" element={<UserProfile />} />
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </Router>
            </CartContextProvider>
        </div>
    );
}

export default App;
