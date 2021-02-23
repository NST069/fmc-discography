import React, { useState, useEffect } from "react";

import ReleaseCard from "./ReleaseCard";
import ReleasePage from "./ReleasePage";
import Loading from "./Loading";

const Discography = ({
  loading,
  loadingPage,
  albums,
  currentAlbum,
  labels,
  getAll,
  getAllbyLabel,
  getAlbumById,
  sortPosts,
  sortingOrder,
  setSortingOrder,
}) => {
  const [filterLabel, setFilterLabel] = useState("0");
  const [selectedRule, setSelectedRule] = useState("1");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const sortDn = (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-sort-down"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 2a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 2z"
      />
      <path
        fillRule="evenodd"
        d="M5.354 10.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 11.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );

  const sortUp = (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-sort-up"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 13a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-1 0v10a.5.5 0 0 0 .5.5z"
      />
      <path
        fillRule="evenodd"
        d="M5.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L3 3.207l1.646 1.647a.5.5 0 0 0 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );

  return (
    <>
      <h1 className=" text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 my-5 text-center">
        Discography
      </h1>
      <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col mx-2 md:flex-row justify-around mt-5 gap-2">
              <div className="bg-gray-900 text-sm text-gray-400 leading-none border-2 border-gray-800 rounded-full inline-flex justify-between">
                <button
                  className={`${
                    filterLabel === "0" ? "active" : ""
                  } inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-300 focus:text-gray-300 rounded-full px-4 py-2`}
                  id="all"
                  onClick={(event) => {
                    event.preventDefault();
                    setFilterLabel("0");
                    getAll();
                  }}
                >
                  <span>All</span>
                </button>
                {labels.map((label) => (
                  <button
                    key={label.name}
                    className={`${
                      filterLabel === label.value ? "active" : ""
                    } inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-300 focus:text-gray-300 rounded-full px-4 py-2`}
                    id={label.name}
                    onClick={(event) => {
                      event.preventDefault();
                      setFilterLabel(label.value);
                      getAllbyLabel(label.name);
                    }}
                  >
                    <span>{label.name}</span>
                  </button>
                ))}
              </div>

              <div className="bg-gray-900 text-sm text-gray-400 leading-none border-2 border-gray-800 rounded-full inline-flex justify-center">
                <button
                  className={` inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-300 focus:text-gray-300 rounded-full px-4 py-2`}
                  id="sort"
                  onClick={(event) => {
                    event.preventDefault();
                    setSortingOrder(!sortingOrder);
                    sortPosts();
                  }}
                >
                  <span>{sortingOrder ? sortDn : sortUp}</span>
                </button>
              </div>

              <div className="bg-gray-900 text-sm text-gray-400 leading-none border-2 border-gray-800 rounded-full inline-flex justify-between">
                {[
                  { name: "New", value: "1" },
                  { name: "Artist", value: "2" },
                  { name: "Title", value: "3" },
                ].map((rule, idx) => (
                  <button
                    key={rule.name}
                    className={`${
                      selectedRule === rule.value ? "active" : ""
                    } inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-gray-300 focus:text-gray-300 rounded-full px-4 py-2`}
                    id={rule.name}
                    onClick={(event) => {
                      event.preventDefault();
                      setSelectedRule(rule.value);
                      sortPosts(rule.name.toLowerCase());
                    }}
                  >
                    <span>{rule.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              {albums.map((album, index, array) => (
                <div key={album.id}>
                  <ReleaseCard
                    album={album}
                    getAlbumById={getAlbumById}
                    openModal={openModal}
                  />
                </div>
              ))}
            </section>
          </>
        )}
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center container md:flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <ReleasePage
                loading={loadingPage}
                currentAlbum={currentAlbum}
                //prev={albums[index-1]?albums[index-1]:null}
                //next={albums[index+1]?albums[index+1]:null}
                //video={getVideo(currentAlbum.id)}
                getAlbumById={getAlbumById}
                closeModal={closeModal}
              />
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Discography;
