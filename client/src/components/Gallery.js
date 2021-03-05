import React, { useEffect } from "react";

import ImageCard from "./ImageCard";
import Loading from "./Loading";

const Gallery = ({ loading, images, getArts }) => {
  useEffect(() => {
    getArts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 my-5 text-center">
        Gallery
      </h1>
      <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
        <section className="grid grid-cols-1 gap-4 mt-5">
          {loading ? (
            <Loading />
          ) : (
            images.map((image) => (
              <div key={image.deviationId}>
                <ImageCard image={image} />
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
};

export default Gallery;
