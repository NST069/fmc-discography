import React, { useState } from "react";

import "tailwindcss/tailwind.css";

import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ToTop from "./components/ToTop";

import env from "react-dotenv";

function App() {
  const endpoint = env.ENDPOINT || "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [selectedTab, setSelectedTab] = useState("Home");

  const getAll = (setAlbs) => {
    setLoading(true);
    axios
      .get(`${endpoint}/discography/getAllMeta`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setAlbums(res.data);
          setAlbs(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() => getAll(setAlbs));
      });
  };

  const getAlbumById = (id) => {
    setLoadingPage(true);
    setCurrentAlbum({});
    axios
      .get(`${endpoint}/discography/getFullAlbum/${id}`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setCurrentAlbum(res.data);
          setLoadingPage(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() => getAlbumById(id));
      });
  };

  const getVideos = () => {
    setLoading(true);
    axios
      .get(`${endpoint}/videography/getAllVideos`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setVideos(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() => getVideos());
      });
  };

  const getArts = () => {
    setLoading(true);
    axios
      .get(`${endpoint}/gallery/getAll`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setImages(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() => getArts());
      });
  };

  const getLatestFromLabel = (label, setResult, setResLoading) => {
    setResLoading(true);
    axios
      .get(`${endpoint}/discography/getLatestFromLabel/${label}`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setResult(res.data);
          setResLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() =>
          getLatestFromLabel(label, setResult, setResLoading)
        );
      });
  };

  const getLatestArts = (setResult, setResLoading) => {
    setResLoading(true);
    axios
      .get(`${endpoint}/gallery/getLatest`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setResult(res.data);
          setResLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() =>
          getLatestArts(setResult, setResLoading)
        );
      });
  };

  return (
    <div className="App bg-black flex flex-col min-h-screen">
      <Header setSelectedTab={setSelectedTab} />

      <div className="flex-grow">
        <Main
          selectedTab={selectedTab}
          loading={loading}
          setLoading={setLoading}
          loadingPage={loadingPage}
          albums={albums}
          labels={[
            { name: "Saturn Ashes", value: "1" },
            { name: "Outer Ring", value: "2" },
          ]}
          getAll={getAll}
          getAlbumById={getAlbumById}
          currentAlbum={currentAlbum}
          videos={videos}
          getVideos={getVideos}
          images={images}
          getArts={getArts}
          getLatestFromLabel={getLatestFromLabel}
          getLatestArts={getLatestArts}
        />
      </div>
      <ToTop />
      <Footer />
    </div>
  );
}

export default App;
