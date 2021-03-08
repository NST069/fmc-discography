import React from "react";

import Loading from "./Loading";

const ReleasePage = ({ loading, currentAlbum, closeModal }) => {
  const validUrl = (url) => {
    // TODO: make global if necessary
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return pattern.test(url.trim());
  };

  const backIcon = (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-90deg-up"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      />
    </svg>
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-900 rounded-md flex-grow md:overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between bg-gray-800">
            <button
              onClick={(event) => {
                event.preventDefault();
                closeModal();
              }}
              className="w-full md:w-auto py-2 px-4 font-semibold rounded-sm text-center text-white bg-gray-900 hover:bg-gray-800"
            >
              {backIcon}
            </button>
            <p className="text-4xl w-full font-bold tracking-wider text-center text-white px-1 py-1">
              {currentAlbum.title} by {currentAlbum.artist}
            </p>
          </div>
          <div className="m-3">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2">
                <img
                  className="w-full"
                  src={currentAlbum.imageUrl}
                  alt={`${currentAlbum.artist} - ${currentAlbum.title}`}
                />
                <a
                  href={currentAlbum.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="button button-dark">Listen</button>
                </a>
              </div>
              <div className="w-full md:w-2/3 px-2">
                {currentAlbum.tags ? (
                  <div className="my-2 flex flex-wrap -m-1">
                    {currentAlbum.tags.map((tag) => (
                      <span
                        key={tag}
                        className="m-1 bg-gray-800 hover:bg-gray-700 rounded-full px-2 font-light text-xs text-gray-200 leading-loose cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <table className="rounded-t-lg m-5 w-full mx-auto bg-black text-gray-200">
                  <thead>
                    <tr className="text-left border-b border-gray-300">
                      {currentAlbum.itemType === "album" ? (
                        <th className="px-4 py-3">#</th>
                      ) : null}
                      <th className="flex-grow px-4 py-3">Title</th>
                      <th className="px-4 py-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAlbum.tracks.map((track) => (
                      <tr
                        key={track.id}
                        className="bg-gray-800 border-b border-gray-700"
                      >
                        {currentAlbum.itemType === "album" ? (
                          <td className="px-4 py-3">{track.trackNum}</td>
                        ) : null}
                        <td className="flex-grow px-4 py-3">{`${
                          track.artist === currentAlbum.artist
                            ? ""
                            : `${track.artist} - `
                        }${track.title}`}</td>
                        <td className="px-4 py-3">{`${Math.floor(
                          track.duration / 60
                        )}:${
                          (track.duration % 60 < 10 ? "0" : "") +
                          (track.duration % 60)
                        }`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {currentAlbum.about
                  ? currentAlbum.about.split("\n").map((str, id) =>
                      validUrl(str) ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-light no-underline text-gray-400"
                          href={str}
                        >
                          {str}
                        </a>
                      ) : (
                        <p className="font-light text-gray-400" key={id}>
                          {str}
                        </p>
                      )
                    )
                  : ""}
                {currentAlbum.credits
                  ? currentAlbum.credits.split("\n").map((str, id) =>
                      validUrl(str) ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-light no-underline text-gray-400"
                          href={str}
                        >
                          {str}
                        </a>
                      ) : (
                        <p className="font-light text-gray-400" key={id}>
                          {str}
                        </p>
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between bg-gray-800 px-1 py-1 ">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline mx-3 flex-none font-light text-gray-500"
              href={currentAlbum.label.website}
            >
              {currentAlbum.label.name}
            </a>
            <p className="mx-3 flex-auto flex-grow font-light text-gray-500 text-right">
              {currentAlbum.releaseDate
                ? ` Released: ${new Date(
                    currentAlbum.releaseDate
                  ).toDateString()}`
                : ""}
              {currentAlbum.upc ? ` UPC: ${currentAlbum.upc}` : ""}
              {currentAlbum.isrc ? ` ISRC: ${currentAlbum.isrc}` : ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReleasePage;
