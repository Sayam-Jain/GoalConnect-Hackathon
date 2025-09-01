/*import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false); 
  const MAX_POSTS = 6;
  const backend = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    if (isUsernameSet) {
      fetchPosts();
      socket.on("newPost", (post) => {
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts, post];
          return updatedPosts.length > MAX_POSTS
            ? updatedPosts.slice(1)
            : updatedPosts;
        });
      });

      socket.on("newReply", (updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      });

      socket.on("deletedPost", (postId) => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      });

      return () => {
        socket.off("newPost");
        socket.off("newReply");
        socket.off("deletedPost");
      };
    }
  }, [isUsernameSet]);

  const fetchPosts = async () => {
    const response = await axios.get(`${backend}/api/posts`);
    setPosts(response.data);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() && username.trim()) {
      // Ensure that the post count is within limits
      if (posts.length >= MAX_POSTS) {
        const oldestPostId = posts[0]._id;
        await axios.delete(`${backend}/api/posts/${oldestPostId}`)
          .catch((error) => console.error("Error deleting oldest post:", error));
      }
      await axios.post(`${backend}/api/posts`, {
        content: newPost,
        username,
      })
      .then(() => fetchPosts())
      .catch((error) => console.error("Error posting new post:", error));
      setNewPost("");
    }
  };
  

  const handleReplySubmit = async (postId) => {
    if (replyContent.trim() && username.trim()) {
      await axios.post(`${backend}api/posts/${postId}/reply`, {
        content: replyContent,
        username, // Include the username when replying
      });
      setReplyContent("");
      setActivePostId(null);
      fetchPosts();
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSet(true); // Set username and allow access to the forum
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Join the Discussion</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full px-4 py-2 rounded-md border-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400 transition duration-300"
        />
        <button
          onClick={handleUsernameSubmit}
          className="mt-4 w-full bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition duration-300"
        >
          Enter Forum
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Live Chat</h2>
      <div className="space-y-6 max-h-96 overflow-y-auto mb-6 pr-4 custom-scrollbar">
        {posts.map((post) => (
          <div key={post._id} className="bg-white bg-opacity-10 p-4 rounded-lg shadow backdrop-filter backdrop-blur-lg">
            <p className="text-white">
              <span className="font-semibold text-yellow-300">{post.username}</span>: {post.content}
            </p>
            <div>
              <button
                onClick={() => setActivePostId(post._id === activePostId ? null : post._id)}
                className="text-yellow-300 hover:text-yellow-100 transition duration-300 mt-2 font-medium"
              >
                {activePostId === post._id ? "Cancel Reply" : "Reply"}
              </button>
              {activePostId === post._id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(post._id);
                  }}
                  className="mt-2"
                >
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-300"
                  >
                    Post Reply
                  </button>
                </form>
              )}
              {post.replies &&
                post.replies.map((reply, index) => (
                  <div key={index} className="bg-white bg-opacity-5 p-3 rounded-md mt-2 ml-4">
                    <p className="text-white">
                      <span className="font-semibold text-yellow-200">{reply.username}</span>: {reply.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handlePostSubmit} className="mt-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your thoughts on the match..."
          className="w-full px-4 py-3 mb-4 bg-white bg-opacity-20 rounded-lg resize-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default DiscussionForum;
*/