import React, { useEffect } from "react";

import ImageCard from "./ImageCard";
import ImagePage from "./ImagePage";
import Loading from "./Loading";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = ({ loading, images, getArts }) => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    initialSlide: 0,
    speed: 1000,
  };

  useEffect(() => {
    getArts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
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
        <div className="h-1/2">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Slider className="mx-10" {...settings}>
                {images.map((image) => (
                  <div key={image.deviationId}>
                    <ImagePage image={image} index={images.indexOf(image)} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
