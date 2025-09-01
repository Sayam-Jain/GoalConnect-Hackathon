import React, { useState } from "react";

function DiscussionForum() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPost.trim()) {
            setPosts([...posts, { id: Date.now(), content: newPost }]);
            setNewPost("");
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Write your post..."
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md resize-none"
                    rows="4"
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Post
                </button>
            </form>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.map((post) => (
                    <div key={post.id} className="bg-gray-100 p-3 rounded-lg shadow">
                        <p className="text-gray-800">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscussionForum;
