import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
const Sessions = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const sessionsData = [
    {
      language: "English",
      subject: "Ball control",
      title: "Ball control and live practice",
      instructor: "Gavin Araujo",
      image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
      videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
      description: "Learn how to control the ball effectively.",
      level: "Beginner",
    },
    {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
      {
        language: "English",
        subject: "Ball control",
        title: "Ball control and live practice",
        instructor: "Gavin Araujo",
        image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
        videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc",
        description: "Learn how to control the ball effectively.",
        level: "Beginner",
      },
  ];

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    setPurchasedCourses(courses);

    if (location.state && location.state.purchasedCourse) {
      const filtered = sessionsData.filter(
        (session) => session.title === location.state.purchasedCourse.title
      );
      setFilteredSessions(filtered); 
    } else {
      setFilteredSessions(sessionsData); 
    }
  }, [location.state]);

  const handleBackToCourses = () => {
    navigate("/digitalfootballacademy");
  };

  const handleImageClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
      
      <h1 className="text-5xl font-bold mb-6 text-white">Sessions</h1>
      <button
        onClick={handleBackToCourses}
        className="bg-orange-600 text-white py-2 px-4 rounded mt-4 hover:bg-orange-500 transition duration-300"
      >
        Back to Browse Courses
      </button>

      <h2 className="text-4xl font-bold mt-8 mb-4 text-white">Purchased Courses</h2>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course, index) => (
            <div
              key={index}
              className="border border-gray-600 p-4 bg-gray-800 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold text-white">{course.title}</h3>
              <p className="text-sm text-gray-300">{course.description}</p>
              <p className="text-sm text-gray-300">Price: ₹{course.price}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No purchased courses found.</p>
        )}
      </div>

      <h2 className="text-4xl font-bold mt-8 mb-4 text-white">Available Sessions</h2>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session, index) => (
            <div
              key={index}
              className="border border-gray-600 p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleImageClick(session.videoUrl)}
            >
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-bold text-white">{session.title}</h3>
              <p className="text-sm text-gray-300">{session.description}</p>
              <p className="text-sm text-gray-300">Level: {session.level}</p>
              <p className="text-sm text-gray-300">Instructor: {session.instructor}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No sessions available.</p>
        )}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-black"
              onClick={closeModal}
            >
              X
            </button>
            <iframe
              src={selectedVideo}
              title="Session Video"
              className="w-full h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
