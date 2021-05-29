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
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    afterChange: (current) => setSelectedId(videos[current].videoId),
  };

  useEffect(() => {
    getVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectedId(videos.length > 0 ? videos[0].videoId : "");
  }, [videos]);

  return (
    <>
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
            <>
              <div classname="h-2/3">
                {selectedId === "" ? null : (
                  <VideoPage
                    video={videos.find((v) => v.videoId === selectedId)}
                  />
                )}
              </div>

              <div className="h-1/3">
                <Slider className="mx-10" {...settings}>
                  {videos.map((video) => (
                    <img src={video.videoThumbnails[3].url} alt={video.title} />
                  ))}
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Videography;
