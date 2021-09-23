import React from "react";

import Homepage from "./Homepage";
import Discography from "./Discography";
import Videography from "./Videography";
import Gallery from "./Gallery";
import Fullwidth from "./Fullwidth";

const Main = ({
  selectedTab,
  albums,
  loading,
  setLoading,
  loadingPage,
  getAll,
  getAlbumById,
  currentAlbum,
  labels,
  videos,
  getVideos,
  images,
  getArts,
  getLatestFromLabel,
  getLatestArts,
}) => {
  return (
    <div>
      {selectedTab === "Home" ? (
        <Homepage
          getLatestFromLabel={getLatestFromLabel}
          getLatestArts={getLatestArts}
        />
      ) : (
        <div className="h-full">
          {selectedTab === "Discography" ? (
            <Discography
              loading={loading}
              setLoading={setLoading}
              loadingPage={loadingPage}
              albums={albums}
              currentAlbum={currentAlbum}
              labels={labels}
              getAll={getAll}
              getAlbumById={getAlbumById}
            />
          ) : null}
          {selectedTab === "Videography" ? (
            <Videography videos={videos} getVideos={getVideos} />
          ) : null}
          {selectedTab === "Gallery" ? (
            <Gallery images={images} getArts={getArts} />
          ) : null}
          {selectedTab === "Fullwidth" ? <Fullwidth /> : null}
        </div>
      )}
    </div>
  );
};

export default Main;
