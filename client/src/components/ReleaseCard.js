import React from "react";

const ReleaseCard = ({ album, getAlbumById, openModal }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded p-3">
      <div className="group relative">
        <img
          className="w-full md:w-72 block rounded"
          src={album.imageUrl}
          alt={`${album.artist} - ${album.title}`}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">{album.title}</h3>
        <p className="text-gray-400">{album.artist}</p>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          getAlbumById(album.id);
          openModal();
        }}
        className="button button-dark"
      >
        Show
      </button>
    </div>
    // <div className="release-card">
    //   <img
    //     className="release-cover"
    //     src={album.imageUrl}
    //     alt={`${album.artist} - ${album.title}`}
    //   />
    //   <p className="release-p release-title">{album.title}</p>
    //   <p className="release-p release-artist">{album.artist}</p>
    //   <button
    //     onClick={(event) => {
    //       event.preventDefault();
    //       getAlbumById(album.id);
    //       openModal();
    //     }}
    //     className="button button-dark"
    //   >
    //     Show
    //   </button>
    // </div>
  );
};

export default ReleaseCard;
