import React, { useState } from "react";

import "tailwindcss/tailwind.css";

import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  //const endpoint = "https://fmc-discography.herokuapp.com";
  const endpoint = process.env.ENDPOINT || "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [selectedTab, setSelectedTab] = useState("Home");

  const getAllbyLabel = (label) => {
    setLoading(true);
    axios
      .get(`${endpoint}/discography/getAllMetaFromLabel/${label}`)
      .then((res) => {
        setAlbums(res.data);
        setLoading(false);
      });
  };

  const getAll = (setAlbs) => {
    setLoading(true);

    axios
      .get(`${endpoint}/discography/getAllMeta`)
      .then((res) => {
        //console.log(res.data);
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          setAlbums(res.data);
          console.log(res.data);
          setAlbs(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        new Promise((r) => setTimeout(r, 5000)).then(() => getAll());
      });
  };

  const getAlbumById = (id) => {
    setLoadingPage(true);
    setCurrentAlbum({});
    axios.get(`${endpoint}/discography/getFullAlbum/${id}`).then((res) => {
      if (res.data.length === 0) throw new Error("No data returned");
      else {
        setCurrentAlbum(res.data);
        setLoadingPage(false);
      }
    });
  };

  const getVideos = () => {
    setLoading(true);
    axios
      .get(`${endpoint}/videography/getAllVideos`)
      .then((res) => {
        if (res.data.length === 0) throw new Error("No data returned");
        else {
          console.log(res.data);
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
          console.log(res.data);
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
          console.log(res.data);
          setResLoading(false);
        }
      });
  };

  const getLatestArts = (setResult, setResLoading) => {
    setResLoading(true);
    axios.get(`${endpoint}/gallery/getLatest`).then((res) => {
      if (res.data.length === 0) throw new Error("No data returned");
      else {
        setResult(res.data);
        console.log(res.data);
        setResLoading(false);
      }
    });
  };

  // useEffect(()=>{
  //   getAll();
  //   getVideos();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          getAllbyLabel={getAllbyLabel}
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

      <Footer />
    </div>
  );
}

export default App;
