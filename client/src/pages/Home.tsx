import { useEffect, useState } from "react";
import axios from "axios";
import PostCard, { type Post } from "../components/PostCard";
import API from "../constant/constant";

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(
                `${API}posts?page=${currentPage}&search=${search}`
            );

            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage, search]);

    const handleDelete = (id: string) => {
        setPosts(posts.filter((post) => post._id !== id));
    };

    return (
        <div className="container mt-4">

            {/* 🔥 SEARCH BAR */}
            <div className="row mb-4">
                <div className="col-md-6 mx-auto">
                    <input
                        className="form-control"
                        placeholder="Search by title or tag..."
                        value={search}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* POSTS */}
            <div className="row">
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center mt-4">
                <ul className="pagination">

                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </div>

        </div>
    );
};

export default Home;