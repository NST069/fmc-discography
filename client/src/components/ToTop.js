import React, { useState, useEffect } from "react";

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-chevron-up"
      viewBox="0 0 16 16"
      height="32"
      width="32"
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
      />
    </svg>
  );

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-20 right-10 transition duration-500 ease-in-out">
      {isVisible ? (
        <div className="bg-gray-900 rounded-md p-2" onClick={scrollToTop}>
          {arrow}
        </div>
      ) : null}
    </div>
  );
};

export default ToTop;
