import React, { useEffect } from "react";

import VideoCard from "./VideoCard";
import Loading from "./Loading";

const Videography = ({ loading, videos, getVideos }) => {
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5">
          Videography
        </h1>
        <section className="grid grid-cols-1 gap-4 mt-5">
          {loading ? (
            <Loading />
          ) : (
            videos.map((video) => {
              console.log(video.title);
              return (
                <div key={video.videoId}>
                  <VideoCard id={video.videoId} title={video.title} />
                </div>
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default Videography;
