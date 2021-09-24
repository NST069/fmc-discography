import React from "react";

const SmallImageCard = ({ image }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded ">
      <div className="group relative">
        <img
          className="w-full block rounded self-center"
          src={image === undefined ? "" : image.content.src}
          alt={image === undefined ? "" : image.title}
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="p-5">
        <p className="text-gray-400">
          {image === undefined ? "" : image.title}
        </p>
      </div>

      <div className="p-5">
        <a href={image.url} target="_blank" rel="noopener noreferrer">
          <button className="button button-dark">Show</button>
        </a>
      </div>
    </div>
  );
};

export default SmallImageCard;
