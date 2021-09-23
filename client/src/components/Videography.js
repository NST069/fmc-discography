import React, { useState, useEffect } from "react";

import VideoCard from "./VideoCard";
import VideoPage from "./VideoPage";
import Loading from "./Loading";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Videography = ({ loading, videos, getVideos }) => {
  const [selectedId, setSelectedId] = useState(
    videos.length > 0 ? videos[0].videoId : ""
  );

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    initialSlide: 1,
    // dotsClass: "slick-dots slick-thumb",
    // customPaging: (i) => {
    //   // <img
    //   //   src={videos[i].videoThumbnails ? videos[i].videoThumbnails[3].url : ""}
    //   //   alt={videos[i].title}
    //   // />;
    //   <a>
    //     <img key={i} src="" alt="" />;
    //   </a>;
    // },
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectedId(videos.length > 0 ? videos[0].videoId : "");
  }, [videos]);

  return (
    <div>
      <div className="contents lg:hidden">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 my-5 text-center">
          Videography
        </h1>
        <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
          <section className="grid grid-cols-1 gap-4 mt-5">
            {loading ? (
              <Loading absolute />
            ) : (
              videos.map((video) => (
                <div key={video.videoId}>
                  <VideoCard video={video} />
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
                {videos.map((video) => (
                  <div key={video.videoId}>
                    <VideoPage video={video} />
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

export default Videography;
