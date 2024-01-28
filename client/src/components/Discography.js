import React, { useState, useEffect } from "react";

import ReleaseCard from "./ReleaseCard";
import ReleasePage from "./ReleasePage";
import Loading from "./Loading";

const Discography = ({
  loading,
  setLoading,
  loadingPage,
  albums,
  currentAlbum,
  labels,
  getAll,
  getAlbumById,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    getAll(setAlbumList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [navOpen, setNavOpen] = useState(false);
  const [filterLabel, setFilterLabel] = useState("0");
  const [selectedRule, setSelectedRule] = useState("1");

  const menuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
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

  const [sortingRule, setSortingRule] = useState("new");
  const [sortingOrder, setSortingOrder] = useState(true); //true = A->z / Newest first
  const rules = [
    { name: "New", value: "1" },
    { name: "Artist", value: "2" },
    { name: "Title", value: "3" },
  ];
  const sortPosts = async (rule) => {
    setLoading(true);
    let r;
    if (rule === undefined) rule = sortingRule;
    switch (rule) {
      case "new":
        r = (a, b) =>
          sortingOrder
            ? b.releaseDate - a.releaseDate
            : a.releaseDate - b.releaseDate;
        break;
      case "artist":
        r = (a, b) =>
          sortingOrder
            ? a.artist.toLowerCase().localeCompare(b.artist.toLowerCase())
            : b.artist.toLowerCase().localeCompare(a.artist.toLowerCase());
        break;
      case "title":
        r = (a, b) =>
          sortingOrder
            ? a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            : b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        break;
      default:
        break;
    }
    setSortingRule(rule);
    setAlbumList(await albumList.sort(r));
    setLoading(false);
  };

  return (
    <div>
      <h1 className=" text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 my-5 text-center">
        Discography
      </h1>
      <div className="grid place-items-center min-h-screen bg-gradient-to-b from-black to-gray-900 p-5">
        {loading ? (
          <Loading absolute />
        ) : (
          <div className="text-center">
            <button
              className="text-white inline-flex p-3 hover:bg-gray-900 rounded sm:hidden ml-auto hover:text-white outline-none nav-toggler"
              data-target="#navigation"
              onClick={() => setNavOpen(!navOpen)}
            >
              <span>{menuIcon}</span>
            </button>
            <div
              className={`${
                navOpen ? "flex" : "hidden"
              } top-navbar w-full sm:inline-flex sm:flex-grow sm:w-auto`}
              id="navigation"
            >
              <div className="flex flex-col mx-2 w-full sm:w-auto sm:flex-row justify-around mt-5 gap-2">
                <div
                  className="inline-flex mr-2 rounded-full leading-none"
                  role="group"
                >
                  <button
                    type="button"
                    className={`${
                      filterLabel === "0" ? "bg-gray-700" : "bg-gray-900"
                    } focus:outline-none text-gray-400 text-sm py-2.5 px-5 rounded-l-full hover:bg-gray-800 hover:shadow-lg w-full sm:w-auto`}
                    key="all"
                    onClick={(event) => {
                      event.preventDefault();
                      setFilterLabel("0");
                      setAlbumList(albums);
                    }}
                  >
                    All
                  </button>
                  {labels.map((label, idx) => (
                    <button
                      type="button"
                      className={`${
                        filterLabel === label.value
                          ? "bg-gray-700"
                          : "bg-gray-900"
                      } focus:outline-none text-gray-400 text-sm py-2.5 px-5 ${
                        labels[idx + 1] ? "" : "rounded-r-full"
                      } hover:bg-gray-800 hover:shadow-lg w-full sm:w-auto`}
                      key={label.name}
                      onClick={(event) => {
                        event.preventDefault();
                        setFilterLabel(label.value);
                        setAlbumList(
                          albums.filter((a) => a.label.name === label.name)
                        );
                      }}
                    >
                      {label.name}
                    </button>
                  ))}
                </div>

                <div
                  className="inline-flex mr-2 rounded-full leading-none"
                  role="group"
                >
                  <button
                    className={`focus:outline-none bg-gray-900 text-gray-400 text-sm object-center rounded-full py-2.5 px-5 hover:bg-gray-800 hover:shadow-lg w-full sm:w-auto`}
                    key="sort"
                    onClick={(event) => {
                      event.preventDefault();
                      setSortingOrder(!sortingOrder);
                      sortPosts();
                    }}
                  >
                    {sortingOrder ? sortDn : sortUp}
                  </button>
                </div>

                <div
                  className="inline-flex mr-2 rounded-full leading-none"
                  role="group"
                >
                  {rules.map((rule, idx) => (
                    <button
                      type="button"
                      className={`${
                        selectedRule === rule.value
                          ? "bg-gray-700"
                          : "bg-gray-900"
                      } focus:outline-none text-gray-400 text-sm py-2.5 px-5 
                        ${rules[idx - 1] ? "" : "rounded-l-full"}
                        ${rules[idx + 1] ? "" : "rounded-r-full"} 
                        hover:bg-gray-800 hover:shadow-lg w-full sm:w-auto`}
                      key={rule.name}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedRule(rule.value);
                        sortPosts(rule.name.toLowerCase());
                      }}
                    >
                      {rule.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              {albumList.map((album, index, array) => (
                <div key={album.id}>
                  <ReleaseCard
                    album={album}
                    getAlbumById={getAlbumById}
                    openModal={openModal}
                  />
                </div>
              ))}
            </section>
          </div>
        )}
      </div>

      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen">
            <div className="relative w-auto my-6 mx-auto" style={{maxHeight: "80vh"}}>
              <ReleasePage
                loading={loadingPage}
                currentAlbum={currentAlbum}
                getAlbumById={getAlbumById}
                closeModal={closeModal}
              />
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Discography;
