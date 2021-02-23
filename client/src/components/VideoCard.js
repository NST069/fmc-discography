import React from "react";

import ReactPlayer from "react-player/lazy";

const VideoCard = ({ id, title }) => {
  return (
    <div className="py-10">
      <div className="max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-gray-900 max-h-screen shadow-2xl flex-row rounded relative">
        <div className="p-2 bg-gray-800  rounded-t">
          <h5 className="text-white text-2xl font-medium">{title}</h5>
        </div>
        <div className="p-3 w-full h-full overflow-y-auto text-gray-100">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              key={id}
              style={{ position: "absolute", top: 0, left: 0 }}
              light
              url={`https://www.youtube.com/watch?v=${id}`}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
