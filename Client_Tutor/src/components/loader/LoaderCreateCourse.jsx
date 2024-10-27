import React, { useEffect, useState } from "react";
import "./loader.css"; // Keep any additional styles here if needed
import loaderGif from "../../assets/images/LoaderCreateCourses.gif";

const LoaderCreateCourse = ({ showSuccessMessage }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate an API call
//   useEffect(() => {
//     if (showSuccessMessage) {
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessMessage]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="max-w-[500px] min-w-[500px] bg-white p-5 rounded-lg shadow-lg">
        <img
          src={loaderGif}
          className="w-full h-auto object-cover"
          alt="Loading"
        />

        {showSuccessMessage ? (
          <p className="text-center font-medium my-5 text-gray-600 transition-opacity duration-300 ease-in-out opacity-100 scale-y-100">
            Xin hãy chờ chúng tôi trong giây lát
          </p>
        ) : (
          <p className="text-center font-medium my-5 text-success transition-opacity duration-300 ease-in-out opacity-100 scale-y-100">
            Thành công, xin chờ trong giây lát
          </p>
        )}
      </div>
    </div>
  );
};

export default LoaderCreateCourse;
