import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../constant/constant";

const CreatePost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", tags); // 🔥 send comma string

        if (image) formData.append("image", image);

        await axios.post(`${API}posts/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            }
        });

        navigate("/");
    };

    return (
        <div className="container mt-5 col-md-6">
            <h3 className="text-center">Create Post</h3>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control my-3"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="form-control my-3"
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* 🔥 TAG INPUT */}
                <input
                    className="form-control my-3"
                    placeholder="Tags (comma separated e.g. react,node,js)"
                    onChange={(e) => setTags(e.target.value)}
                />

                <input
                    type="file"
                    className="form-control my-3"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />

                <button className="btn btn-primary w-100">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreatePost;