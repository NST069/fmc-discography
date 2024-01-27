import React from "react";

const ImageCardSmall = ({ image }) => {
  return (
    <div className="p-10">
      <div className="max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-gray-900 flex-row rounded relative">
        <div className="p-2 bg-gray-800 rounded-t-md">
          <h5 className="text-white text-2xl font-medium">{image.title}</h5>
        </div>
        <img className="object-fit" src={image.content.src} alt={image.title} />
        <div className="bg-gray-800  rounded-b-md">
          <p className="mx-3 flex-auto flex-grow font-light text-gray-500 text-right">
            Favs: {image.stats.favourites}, Comments: {image.stats.comments}
          </p>
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            <button className="button button-dark">Show</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCardSmall;
