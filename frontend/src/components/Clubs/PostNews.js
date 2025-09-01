import React, { useState } from 'react';

const PostNewsForm = () => {
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null); // State for thumbnail image file
    const backend = process.env.REACT_APP_BACKEND_URL

    // Handle file upload
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file); // Store file in state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newsTitle);
        formData.append('content', newsContent);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail); // Append image file
        }

        // Send POST request to backend
        try {
            const response = await fetch(`${backend}/apis/news`, {
                method: 'POST',
                body: formData, // Send FormData object
            });

            if (response.ok) {
                alert('News item added successfully!');
                setNewsTitle('');
                setNewsContent('');
                setThumbnail(null);
            } else {
                alert('Failed to add news item.');
            }
        } catch (error) {
            console.error('Error submitting news:', error);
            alert('An error occurred while submitting the news.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-gray-900 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-white">Post News</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-white mb-2">News Title</label>
                    <input
                        id="title"
                        type="text"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                        placeholder="Enter the news title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-white mb-2">News Content</label>
                    <textarea
                        id="content"
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                        rows="6"
                        placeholder="Enter the news content"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-white mb-2">Upload Thumbnail</label>
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="w-full p-2 bg-gray-800 text-white border border-gray-600"
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                    Submit News
                </button>
            </form>
        </div>
    );
};

export default PostNewsForm;
