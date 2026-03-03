import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../constant/constant";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // ✅ Proper change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${API}auth/login`,
                formData
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/");
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Login</h3>

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    className="form-control my-3"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    className="form-control my-3"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button className="btn btn-success w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;