import React, {useState, useEffect} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const endpoint = "https://fmc-discography.herokuapp.com";

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingRule, setSortingRule] = useState("new");
  const [sortingOrder, setSortingOrder] = useState(true); //true = A->z / Newest first
  const [darkMode, setDarkMode] = useState(true);
  

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
  } 

  useEffect(()=>{
    getAll();
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
          labels={[{name: "Saturn Ashes", value:"1"}, {name: "Outer Ring", value:"2"}]}
          getAllbyLabel={getAllbyLabel}
          getAll={getAll}
          sortPosts={sortPosts}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
        />
        <Main
          darkMode={darkMode}
          loading={loading}
          albums={albums}
        />
        <Footer
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
