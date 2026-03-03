import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleTheme } = useTheme();

    // 🔥 compute every render
    const isLoggedIn = !!localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            <Link className="navbar-brand fw-bold" to="/">
                BlogApp
            </Link>

            <div className="ms-auto d-flex gap-2 align-items-center">

                <button className="btn btn-warning" onClick={toggleTheme}>
                    Toggle Theme
                </button>

                {isLoggedIn ? (
                    <>
                        <Link to="/create" className="btn btn-success">
                            Create Post
                        </Link>

                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline-light">
                            Login
                        </Link>

                        <Link to="/signup" className="btn btn-light">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;