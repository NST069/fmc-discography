import React from "react";

const Loading = ({ absolute }) => {
  return (
    <div
      className={`${
        absolute ? "fixed top-0 right-0 h-screen w-screen z-40 " : ""
      }flex justify-center items-center`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
