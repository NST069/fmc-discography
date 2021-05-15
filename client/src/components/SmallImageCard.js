import React from "react";

const SmallImageCard = ({ image, setSelectedId }) => {
  return (
    <div
      className="bg-gray-900 shadow-lg rounded "
      onClick={(e) => {
        e.preventDefault();
        setSelectedId(image.deviationId);
      }}
    >
      <div className="group relative">
        <img
          className="w-full block rounded self-center"
          src={image === undefined ? "" : image.content.src}
          alt={image === undefined ? "" : image.title}
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">
          {image === undefined ? "" : image.title}
        </h3>
      </div>
    </div>
  );
};

export default SmallImageCard;
