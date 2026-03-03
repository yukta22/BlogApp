import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../constant/constant"

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res: any = await axios.post(`${API}auth/signup`, form);

        // if (res.message == 'User already exists') {
        //     alert("User already exists");
        //     return;
        // }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Signup</h3>
            <form onSubmit={handleSubmit}>
                <input className="form-control my-3" placeholder="Username"
                    onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input className="form-control my-3" placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" className="form-control my-3" placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />

                <button className="btn btn-primary w-100">Signup</button>
            </form>
        </div>
    );
};

export default Signup;