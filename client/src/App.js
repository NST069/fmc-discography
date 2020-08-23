import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import Main from './components/Main';

function App() {

  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  

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

  return (
    <div className="App">
      <Main
        labels={["Saturn Ashes", "Outer Ring"]}
        getAllbyLabel={getAllbyLabel}
        getAll={getAll}
        albums={albums}
      />
    </div>
  );
}

export default App;
