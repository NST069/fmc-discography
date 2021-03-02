import React from "react";

const SmallReleaseCard = ({ album }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded p-3 w-64">
      <div className="group relative">
        <img
          className="w-full block rounded"
          src={album.imageUrl}
          alt={`${album.artist} - ${album.title}`}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">{album.title}</h3>
        <p className="text-gray-400">{album.artist}</p>
      </div>
      <a href={album.url} target="_blank" rel="noopener noreferrer">
        <button className="button button-dark">Listen</button>
      </a>
    </div>
  );
};

export default SmallReleaseCard;
