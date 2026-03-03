import React from "react";
import axios from "axios";
import API from "../constant/constant";

export interface Post {
    _id: string;
    title: string;
    content: string;
    image?: string;
    username?: string;
    createdAt?: string;
    tags?: string[];
    user: string;
}

interface Props {
    post: Post;
    onDelete: (id: string) => void;
}

const PostCard: React.FC<Props> = ({ post, onDelete }) => {

    const loggedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
    console.log("loggedUser", loggedUser)
    console.log("post.image", post.image)
    const isOwner =
        loggedUser?.id == post.user ||
        loggedUser?._id == post.user;
    console.log("isOwner", isOwner)
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await axios.delete(`${API}posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            onDelete(post._id);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-lg h-100 border-0 position-relative">

                {/* 🔥 DELETE ICON TOP RIGHT */}
                {isOwner && (
                    <button
                        onClick={handleDelete}
                        className="btn btn-sm btn-danger position-absolute"
                        style={{
                            top: "10px",
                            right: "10px"
                        }}
                    >
                        Delete
                    </button>
                )}

                {post.image ? (
                    <img
                        src={`http://localhost:5000${post.image}`}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        alt="Post"
                    />
                ) : (
                    <div
                        style={{
                            height: "200px",
                            background: "gray",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "1.2rem",
                            fontWeight: "bold"
                        }}
                    >
                        No Image Available
                    </div>
                )}

                <div className="card-body d-flex flex-column">

                    <h5 className="fw-bold">{post.title}</h5>

                    <p className="text-muted">
                        {post.content.length > 100
                            ? post.content.substring(0, 100) + "..."
                            : post.content}
                    </p>

                    {/* TAG BADGES */}
                    <div className="mb-2">
                        {post.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="badge bg-secondary me-1"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto">

                        {post.username && (
                            <small className="text-secondary">
                                By {post.username}
                            </small>
                        )}

                        <div>
                            <small className="text-muted">
                                {post.createdAt &&
                                    new Date(post.createdAt).toLocaleDateString()}
                            </small>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;