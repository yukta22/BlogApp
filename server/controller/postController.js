import Post from "../models/post.js";

// ===============================
// CREATE POST
// ===============================
export const createPost = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;

        if (!title || !content) {
            const error = new Error("Title and content are required");
            error.statusCode = 400;
            return next(error);
        }

        // 🔥 Convert comma separated string into array
        const tagsArray = tags
            ? tags.split(",").map(tag => tag.trim())
            : [];

        const newPost = await Post.create({
            title,
            content,
            tags: tagsArray,
            username: req.user.username,
            user: req.user.id,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json({
            success: true,
            data: newPost
        });

    } catch (error) {
        next(error);
    }
};

// ===============================
// GET POSTS
// ===============================
export const getPosts = async (req, res, next) => {
    try {
        const { search, page = 1 } = req.query;

        const limit = 6;
        const skip = (Number(page) - 1) * limit;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { tags: { $regex: search, $options: "i" } }
                ]
            };
        }

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Post.countDocuments(query);

        res.json({
            success: true,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

// ===============================
// DELETE POST
// ===============================
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            const error = new Error("Post not found");
            error.statusCode = 404;
            return next(error);
        }

        // if (post.user.toString() !== req.user._id.toString()) {
        //     const error = new Error("Not authorized to delete this post");
        //     error.statusCode = 403;
        //     return next(error);
        // }

        await post.deleteOne();

        res.json({
            success: true,
            message: "Post deleted"
        });
    } catch (error) {
        next(error);
    }
};

export const addComment = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text) {
            const error = new Error("Comment text is required");
            error.statusCode = 400;
            return next(error);
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            const error = new Error("Post not found");
            error.statusCode = 404;
            return next(error);
        }

        post.comments.push({
            user: req.user._id,
            username: req.user.username,
            text
        });

        await post.save();

        res.json({
            success: true,
            comments: post.comments
        });
    } catch (error) {
        next(error);
    }
};

export const toggleLike = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            const error = new Error("Post not found");
            error.statusCode = 404;
            return next(error);
        }

        const userId = req.user._id.toString();

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.json({
            success: true,
            likesCount: post.likes.length,
            liked: !alreadyLiked
        });
    } catch (error) {
        next(error);
    }
};
