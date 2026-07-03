import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ExplorePage } from "./pages/ExplorePage";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
import { MyTripsPage } from "./pages/MyTripsPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

export const App = () => {
    return (
        <>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ProtectedRoute>{<ExplorePage />}</ProtectedRoute>} />

                    <Route path="/my-trips/:id" element={<ProtectedRoute>{<MyTripsPage />}</ProtectedRoute>} />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </>
    );
};
