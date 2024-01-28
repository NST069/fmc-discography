import React from "react";

const ImageCard = ({ image, openModal, setSelectedImage }) => {
  return (
    <div className=" max-w-md mx-auto xl:max-w-4xl lg:max-w-2xl md:max-w-2xl bg-gray-900 shadow-2xl flex-row rounded relative">
      <div className="p-2 bg-gray-800 rounded-t-md">
        <h5 className="text-white text-2xl font-medium">{image.title}</h5>
      </div>
      <img
        className="object-cover"
        style={{aspectRatio:"1/1"}}
        src={image.content.src}
        alt={image.title}
        onClick={()=>{
          setSelectedImage(image);
          openModal();
          }
        }
      />
      <div className="bg-gray-800  rounded-b-md">
        <p className="mx-3 flex-auto flex-grow font-light text-gray-500 text-right">
          Favs: {image.stats.favourites}, Comments: {image.stats.comments}
        </p>
        <a href={image.url} target="_blank" rel="noopener noreferrer">
          <button className="button button-dark">Show</button>
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
