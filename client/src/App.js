import React, {useState, useEffect} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PlayerFooter from './components/PlayerFooter';
import ReactJkMusicPlayer from 'react-jinke-music-player'

function App() {

  //const endpoint = "https://fmc-discography.herokuapp.com";
  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingRule, setSortingRule] = useState("new");
  const [sortingOrder, setSortingOrder] = useState(true); //true = A->z / Newest first
  const [darkMode, setDarkMode] = useState(true);
  const [playlist, setPlaylist] = useState([]);

  const getAllbyLabel = (label)=>{
    setLoading(true);
    //console.log(label);
    axios.get(`${endpoint}/discography/getAllFromLabel/${label}`)
    .then((res)=>{
      //res.data.map(label=>{setAlbums(label.albumData)});
      console.log(res.data);
      setAlbums(res.data);
      setLoading(false);
    });
  };

  const getAll = ()=>{
    setLoading(true);

    axios.get(`${endpoint}/discography/getAll`)
    .then((res)=>{
      console.log(res.data);
      setAlbums(res.data);
      setLoading(false);
    })
  };

  const addToPlaylist = (track)=>{
    setPlaylist([...playlist, track]);
  };

  const deleteFromPlaylist = (id)=>{
    setPlaylist(playlist.filter((track)=>track.id!==id));
    console.log(`Deleted id ${id}`);
  }
  

  useEffect(()=>{
    getAll();
    setPlaylist([
      {id: 0, name: "NST069 - Matter", url: 'https://t4.bcbits.com/stream/674bad47b82ab1c72a0ebf957ef854fe/mp3-128/1711439680?p=0&ts=1603202473&t=8a12e9c221097f4aefd5d4e5dc62e8be6956877d&token=1603202473_11fdd5357bbf5073d676af64298e1d04f808a299'},
      {id: 1, name: "NST069 - Loneliness", url: 'https://t4.bcbits.com/stream/fcc84c28b36cf3fabd8afd051e7fcc33/mp3-128/466998539?p=0&ts=1603202473&t=bf27f939ee260b57a33dd62970782f00891fe391&token=1603202473_389dc54237822f67d8bb8a792717dc9c0b1cfbaf'},
      {id: 2, name: "hr3postnoi - ghost", url: 'https://t4.bcbits.com/stream/c22193d7f331dd6ffc268f80a62e6100/mp3-128/975474397?p=0&ts=1603202473&t=5a7bd8493b0206f505fada7eb1b8baf21b0dfc45&token=1603202473_2d40fa907ab5aa99e584fda89a3b079cfd58d0b9'}
    ]);
  }, []);

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
    <div className="App">
      <div className={darkMode?"bg-secondary":"bg-white"}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Main
          darkMode={darkMode}
          loading={loading}
          albums={albums}
          labels={[{name: "Saturn Ashes", value:"1"}, {name: "Outer Ring", value:"2"}]}
          getAllbyLabel={getAllbyLabel}
          getAll={getAll}
          sortPosts={sortPosts}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
        />
        {/* {playlist.length>0 
        ?<PlayerFooter
          darkMode={darkMode}
          playlist={playlist}
        />
        :null} */}
        <PlayerFooter
          darkMode={darkMode}
          playlist={playlist}
          deleteFromPlaylist={deleteFromPlaylist}
        />
        <Footer
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
