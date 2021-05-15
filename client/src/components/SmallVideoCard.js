import React from "react";

const SmallVideoCard = ({ video, setSelectedId }) => {
  return (
    <div
      key={video.videoId}
      onClick={(e) => {
        e.preventDefault();
        setSelectedId(video.videoId);
      }}
    >
      <img
        src={
          video.videoThumbnails === undefined
            ? ""
            : video.videoThumbnails[3].url
        }
        alt={video.title}
      />
    </div>
  );
};

export default SmallVideoCard;
