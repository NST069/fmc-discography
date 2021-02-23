import React from "react";

import Fullwidth from "./Fullwidth";
import Discography from "./Discography";
import Videography from "./Videography";

const Main = ({
  selectedTab,
  albums,
  loading,
  loadingPage,
  getAll,
  getAllbyLabel,
  getAlbumById,
  currentAlbum,
  labels,
  sortPosts,
  sortingOrder,
  setSortingOrder,
  videos,
  getVideos,
}) => {
  return (
    <div className="container mx-auto max-w-screen-lg">
      {selectedTab === "Home" ? null : null}
      {selectedTab === "Discography" ? (
        <Discography
          loading={loading}
          loadingPage={loadingPage}
          albums={albums}
          currentAlbum={currentAlbum}
          labels={labels}
          getAll={getAll}
          getAllbyLabel={getAllbyLabel}
          getAlbumById={getAlbumById}
          sortPosts={sortPosts}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
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
