import React from "react";

const SmallImageCard = ({ art }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded p-3 w-64">
      <div className="group relative">
        <img
          className="w-full block rounded self-center"
          src={art.content.src}
          alt={art.title}
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">{art.title}</h3>
      </div>
      <a href={art.url} target="_blank" rel="noopener noreferrer">
        <button className="button button-dark">Show</button>
      </a>
    </div>
  );
};

export default SmallImageCard;
