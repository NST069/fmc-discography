import React, { useState, useEffect } from "react";

import ImageCard from "./ImageCard";
import SmallImageCard from "./SmallImageCard";
import Loading from "./Loading";

const Gallery = ({ loading, images, getArts }) => {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    getArts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="contents lg:hidden">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 my-5 text-center">
          Gallery
        </h1>
        <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
          <section className="grid grid-cols-1 gap-4 mt-5">
            {loading ? (
              <Loading absolute />
            ) : (
              images.map((image) => (
                <div key={image.deviationId}>
                  <ImageCard image={image} />
                </div>
              ))
            )}
          </section>
        </div>
      </div>
      <div className="hidden lg:contents">
        <div className="h-full flex ">
          <div className="flex-1">
            {selectedId === "" ? null : (
              <div className="w-full xl:w-9/12 justify-self-center">
                <ImageCard
                  image={images.find((i) => i.deviationId === selectedId)}
                />
              </div>
            )}
          </div>
          <div className="flex overflow-hidden w-96">
            <div className="flex-1 overflow-y-scroll bg-gradient-to-b from-black to-gray-900 p-5">
              <div className="grid place-items-center">
                <section className="grid grid-cols-1 gap-4 mt-5">
                  {loading ? (
                    <Loading />
                  ) : (
                    images.map((image) => (
                      <div key={image.deviationId}>
                        <SmallImageCard
                          image={image}
                          setSelectedId={setSelectedId}
                        />
                      </div>
                    ))
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
