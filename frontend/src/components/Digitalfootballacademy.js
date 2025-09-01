import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  
  const backend = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const coursesData = [
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Advanced Tactics",
      description: "Understand advanced game strategies.",
      price: "1200",
      topics: ["Formation", "Set Pieces", "Game Management"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
    {
      title: "Football Basics",
      description: "Learn the fundamentals of football.",
      price: "800",
      topics: ["Dribbling", "Passing", "Shooting"],
    },
   
  ];

  const instructorsData = [
    {
      name: "John Doe",
      title: "Head Coach",
      teams: ["Team A", "Team B"],
      licenses: ["UEFA A License"],
      contact: {
        phone: "1234567890",
        email: "john@example.com",
      },
    },
    {
      name: "Jane Smith",
      title: "Assistant Coach",
      teams: ["Team C"],
      licenses: ["UEFA B License"],
      contact: {
        phone: "0987654321",
        email: "jane@example.com",
      },
    },
    {
      name: "Jane Smith",
      title: "Assistant Coach",
      teams: ["Team C"],
      licenses: ["UEFA B License"],
      contact: {
        phone: "0987654321",
        email: "jane@example.com",
      },
    },
  ];

  const [showContactInfo, setShowContactInfo] = useState(
    Array.isArray(instructorsData) ? Array(instructorsData.length).fill(false) : []
  );

  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    setPurchasedCourses(storedCourses);
  }, []);

  const handlePayNow = async (course) => {
    const amountInPaise = course.price === "Start for Free" ? 0 : parseInt(course.price) * 100;

    try {
      const response = await fetch(`${backend}/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const orderData = await response.json();

      const options = {
        key: "rzp_test_iVFlHfIHXJjTX9", 
        amount: amountInPaise,
        currency: "INR",
        name: "Football Training",
        description: `Payment for ${course.title}`,
        order_id: orderData.id,
        handler: function (response) {
          console.log("Payment successful!", response);
          alert("Payment successful!");

          const storedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
          const updatedCourses = [...storedCourses, course];
          localStorage.setItem("purchasedCourses", JSON.stringify(updatedCourses));

          setPurchasedCourses(updatedCourses);

          navigate("/sessions");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Something went wrong with the payment.");
    }
  };

  const toggleContactInfo = (index) => {
    setShowContactInfo((prev) =>
      prev.map((show, i) => (i === index ? !show : show))
    );
  };

  const resetPurchasedCourses = () => {
    localStorage.removeItem("purchasedCourses");
    setPurchasedCourses([]);
    alert("Purchased courses have been reset!");
  };

  return (
    <div className="flex flex-col items-center py-10 bg-black">
    
      <h1 className="text-4xl font-bold mb-6 text-white">Browse Courses</h1>
      <p className="text-sm mb-10 text-gray-400">ALL COURSES HAVE LIFETIME ACCESS</p>

      <div className="flex flex-wrap justify-center gap-8">
        {coursesData.length > 0 ? (
          coursesData.map((course, index) => (
            <div
              key={index}
              className="border border-gray-600 p-6 w-80 h-auto flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div>
                <h2 className="text-xl font-bold mb-3 text-white">{course.title}</h2>
                <p className="text-sm text-gray-300 mb-2">{course.description}</p>
                <ul className="text-sm text-gray-300 list-disc list-inside mb-4">
                  {course.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handlePayNow(course)}
                className="bg-orange-600 text-white py-2 px-5 rounded mt-4 hover:bg-orange-500 transition duration-300"
              >
                ₹{course.price}
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">No courses available at this time.</p>
        )}
      </div>

      {purchasedCourses.length > 0 && (
        <>
          <h2 className="text-4xl font-bold mb-6 text-white mt-12">Purchased Courses</h2>
          <button
            onClick={resetPurchasedCourses}
            className="bg-red-600 text-white py-2 px-5 mb-4 rounded hover:bg-red-500 transition duration-300"
          >
            Reset Purchased Courses
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedCourses.map((course, index) => (
              <div
                key={index}
                className="border border-gray-600 p-6 bg-gray-700 rounded-lg shadow-lg cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{course.description}</p>
                <p className="text-sm text-gray-300">Price: ₹{course.price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <h1 className="text-4xl font-bold mb-4 text-white">Our Instructors</h1>
      <p className="text-sm mb-8 text-white">Meet our coaches</p>
      <div className="flex space-x-4 mb-8">
        {instructorsData.length > 0 ? (
          instructorsData.map((instructor, index) => (
            <div
              key={index}
              className="border border-gray-400 p-4 w-80 h-96 flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
                <p className="text-sm">{instructor.title}</p>
                <ul className="text-sm list-disc list-inside">
                  {instructor.teams.map((team, teamIndex) => (
                    <li key={teamIndex}>{team}</li>
                  ))}
                  {instructor.licenses.map((license, licenseIndex) => (
                    <li key={licenseIndex}>{license}</li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-400 transition duration-300"
                onClick={() => toggleContactInfo(index)}
              >
                Contact Us
              </button>
              {showContactInfo[index] && (
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <p className="text-sm text-black">Phone: {instructor.contact.phone}</p>
                  <p className="text-sm text-black">Email: {instructor.contact.email}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-black">No instructors available at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Instructors;
