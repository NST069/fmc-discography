import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingRule, setSortingRule] = useState("artist");
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
    console.log(sortingRule, rule, albums);
    switch(rule){
      case "artist":
        r = (a,b)=>(a.artist.toLowerCase()).localeCompare(b.artist.toLowerCase());
        break;
      case "title":
        r = (a,b)=>(a.title.toLowerCase()).localeCompare(b.title.toLowerCase());
        break;
      default:
        break;
    }
    setSortingRule(rule);
    setAlbums(await albums.sort(r));
    console.log(sortingRule, rule, albums);
    setLoading(false);
  }

  return (
    <div className="App">
      <div className={darkMode?"bg-secondary":"bg-white"}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          labels={["Saturn Ashes", "Outer Ring"]}
          getAllbyLabel={getAllbyLabel}
          getAll={getAll}
          sortPosts={sortPosts}
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
