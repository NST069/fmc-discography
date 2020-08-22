import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import Main from './components/Main';

function App() {

  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  

  const getAllbyLabel = (label)=>{
    setAlbums([]);
    console.log(label);
    axios.get(`${endpoint}/discography/getAllFromLabel/${label}`)
    .then((res)=>{
      //res.data.map(label=>{setAlbums(label.albumData)});
      setAlbums(res.data.albumData);
    });
  };

  return (
    <div className="App">
      <Main
        labels={["Saturn Ashes", "Outer Ring"]}
        getAllbyLabel={getAllbyLabel}
        albums={albums}
      />
    </div>
  );
}

export default App;
