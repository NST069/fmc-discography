import React, { useState, useEffect } from "react";

import VideoCard from "./VideoCard";
//import VideoPage from "./VideoPage";
import SmallVideoCard from "./SmallVideoCard";
import Loading from "./Loading";

const Videography = ({ loading, videos, getVideos }) => {
  const [selectedId, setSelectedId] = useState(
    videos.length > 0 ? videos[0].videoId : ""
  );

  useEffect(() => {
    getVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="h-full flex ">
          <div className="flex-1">
            {selectedId === "" ? null : (
              <div className="w-full xl:w-9/12 justify-self-center">
                <VideoCard
                  video={videos.find((v) => v.videoId === selectedId)}
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
                    videos.map((video) => (
                      <div key={video.videoId}>
                        <SmallVideoCard
                          video={video}
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

export default Videography;
