import React from "react";

import Homepage from "./Homepage";
import Discography from "./Discography";
import Videography from "./Videography";
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
  getLatestFromLabel,
}) => {
  return (
    <>
      {selectedTab === "Home" ? (
        <Homepage getLatestFromLabel={getLatestFromLabel} />
      ) : (
        <div className="container mx-auto max-w-screen-lg">
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
          {selectedTab === "Fullwidth" ? <Fullwidth /> : null}
        </div>
      )}
    </>
  );
};

export default Main;
