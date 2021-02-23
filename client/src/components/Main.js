import React from "react";

import Fullwidth from "./Fullwidth";
import Discography from "./Discography";
import Videography from "./Videography";

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
}) => {
  return (
    <div className="container mx-auto max-w-screen-lg">
      {selectedTab === "Home" ? null : null}
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
  );
};

export default Main;
