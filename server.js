const express = require("express"); 
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 5500; // Ensure frontend uses this port

app.use(express.json());  
app.use(cors());

// Load blog posts from blog-content.json
let blogPosts;
try {
    blogPosts = require("./blog-content.json");
    if (!blogPosts.posts) {
        blogPosts = { posts: [] };
    }
} catch (error) {
    console.error("Error loading blog posts:", error);
    blogPosts = { posts: [] };
}

// Endpoint to get all blog posts

app.get("/api/posts", (req, res) => {
    res.json({ posts: blogPosts.posts });
});
// Endpoint to add a new blog post
app.post("/api/posts", (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = { title, content, date: new Date().toISOString().split("T")[0] };
    blogPosts.posts.push(newPost);

    // Save the updated blog posts to the JSON file
    fs.writeFile(path.join(__dirname, "blog-content.json"), JSON.stringify(blogPosts, null, 2), (err) => {
        if (err) {
            console.error("Error saving blog post:", err);
            return res.status(500).json({ message: "Error saving blog post" });
        }
        res.status(201).json({ message: "Post successfully created", post: newPost });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
