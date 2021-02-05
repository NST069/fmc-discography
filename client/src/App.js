import React, {useState, useEffect} from 'react';

import "tailwindcss/tailwind.css"

import axios from 'axios';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  //const endpoint = "https://fmc-discography.herokuapp.com";
  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingRule, setSortingRule] = useState("new");
  const [sortingOrder, setSortingOrder] = useState(true); //true = A->z / Newest first
  //const [darkMode, setDarkMode] = useState(true);
  //const [playlist, setPlaylist] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [selectedTab, setSelectedTab] = useState('Discography');

  const getAllbyLabel = (label)=>{
    setLoading(true);
    axios.get(`${endpoint}/discography/getAllMetaFromLabel/${label}`)
    .then((res)=>{
      setAlbums(res.data);
      setLoading(false);
    });
  };

  const getAll = ()=>{
    setLoading(true);

    axios.get(`${endpoint}/discography/getAllMeta`)
    .then((res)=>{
      //console.log(res.data);
      if(res.data.length===0)
        throw new Error("No data returned");
      else{
        setAlbums(res.data);
        setLoading(false);
      }
    })
    .catch((err)=>{
      new Promise(r=>setTimeout(r, 5000))
      .then(()=>getAll());
    })
  };

  const getAlbumById = (id)=>{
    setLoading(true);
    setCurrentAlbum({});
    axios.get(`${endpoint}/discography/getFullAlbum/${id}`)
    .then((res)=>{
      if(res.data.length===0)
        throw new Error("No data returned");
      else{
        setCurrentAlbum(res.data);
        setLoading(false);
      }
    });
  }

  // const addToPlaylist = (track)=>{
  //   if(playlist.find((t)=>t.id===track.id)) return;
  //   setPlaylist([...playlist, track]);
  // };

  // const deleteFromPlaylist = (id)=>{
  //   setPlaylist(playlist.filter((track)=>track.id!==id));
  // }

  const getVideos = ()=>{
    setLoading(true);
    axios.get(`${endpoint}/videography/getAllVideos`)
    .then((res)=>{
      if(res.data.length===0)
        throw new Error("No data returned");
      else{
        setVideos(res.data);
        setLoading(false);
      }
    })
    .catch((err)=>{
      new Promise(r=>setTimeout(r, 5000))
      .then(()=>getVideos());
    })
  }
  

  useEffect(()=>{
    getAll();
    getVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortPosts = async (rule)=>{
    setLoading(true);
    let r;
    if(rule===undefined) rule=sortingRule;
    switch(rule){
      case "new":
        r = (a,b)=>(sortingOrder ? b.releaseDate - a.releaseDate : a.releaseDate - b.releaseDate);
        break;
      case "artist":
        r = (a,b)=>(sortingOrder ? (a.artist.toLowerCase()).localeCompare(b.artist.toLowerCase()) : (b.artist.toLowerCase()).localeCompare(a.artist.toLowerCase()));
        break;
      case "title":
        r = (a,b)=>(sortingOrder ? (a.title.toLowerCase()).localeCompare(b.title.toLowerCase()) : (b.title.toLowerCase()).localeCompare(a.title.toLowerCase()));
        break;
      default:
        break;
    }
    setSortingRule(rule);
    setAlbums(await albums.sort(r));
    setLoading(false);
  }

  return (
    <div className="App bg-black flex flex-col min-h-screen">
      <Header
        setSelectedTab={setSelectedTab}
      />

      <div className="flex-grow">
        <Main
          selectedTab={selectedTab}
          loading={loading}
          albums={albums}
          labels={[{name: "Saturn Ashes", value:"1"}, {name: "Outer Ring", value:"2"}]}
          getAllbyLabel={getAllbyLabel}
          getAll={getAll}
          getAlbumById={getAlbumById}
          currentAlbum={currentAlbum}
          sortPosts={sortPosts}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          videos={videos}
        />
      </div>

      <Footer/>
    </div>
  );
}

export default App;
