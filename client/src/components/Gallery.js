import React, { useState, useEffect } from "react";

import ImageCardSmall from "./ImageCardSmall";
import ImageCard from "./ImageCard";
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

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
                  <ImageCardSmall image={image} />
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
            <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                {images.map((image) => (
                  <div key={image.deviationId}>
                    <ImageCard image={image} index={images.indexOf(image)} openModal={openModal} setSelectedImage={setSelectedImage} />
                  </div>
                ))}
              </section>
            </div>
          )}
        </div>
      </div>

      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              <img className="max-h-screen rounded-lg" src={selectedImage.content.src} alt={selectedImage.title} onClick={()=>{
                setSelectedImage();
                closeModal();
                }
              }/>
              
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Gallery;
