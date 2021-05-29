import React from "react";

import ReactPlayer from "react-player/lazy";

const VideoPage = ({ video }) => {
  return (
    <div className="p-10">
      <div className="max-h-full max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-gray-900 shadow-2xl flex-row rounded relative">
        <div className="p-2 bg-gray-800  rounded-t-md">
          <h5 className="text-white text-2xl font-medium">{video.title}</h5>
        </div>
        <div>
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              key={video.videoId}
              style={{ position: "absolute", top: 0, left: 0 }}
              light
              url={`https://www.youtube.com/watch?v=${video.videoId}`}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div className="bg-gray-800  rounded-b-md">
            <div className="flex flex-row justify-between px-1 py-1 ">
              <p className="mx-3 flex-auto flex-grow font-light text-gray-500">
                {video.viewCountText}
              </p>
              <p className="mx-3 flex-auto flex-grow font-light text-gray-500 text-right">
                {video.publishedText}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="w-full flex flex-col justify-between">
        <div>
          <div className="flex flex-row">
            <div className="text-gray-500 flex-none">prevIcon</div>
            <div className="flex-grow">
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <ReactPlayer
                  key={video.videoId}
                  style={{ position: "absolute", top: 0, left: 0 }}
                  light
                  url={`https://www.youtube.com/watch?v=${video.videoId}`}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </div>
            <div className="text-gray-500 flex-none">{nextIcon}</div>
          </div>
        </div>
        <h5 className="text-white text-4xl font-bold flex">{video.title}</h5>
        <div className="">
          <div className="flex flex-row justify-between px-1 py-1 ">
            <p className="mx-3 flex-auto flex-grow font-light text-gray-500">
              {video.viewCountText}
            </p>
            <p className="mx-3 flex-auto flex-grow font-light text-gray-500 text-right">
              {video.publishedText}
            </p>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default VideoPage;
