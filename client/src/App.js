import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import Main from './components/Main';

function App() {

  const endpoint = "http://localhost:5000";

  const [albums, setAlbums] = useState([]);

  const getAllSNH = ()=>{
    setAlbums([]);
    axios.get(`${endpoint}/discography/getAllFromLabel/Saturn Ashes`)
    .then((res)=>{
      //res.data.map(label=>{setAlbums(label.albumData)});
      setAlbums(res.data.albumData);
    });
  };

  return (
    <div className="App">
      <Main
        getAllSNH={getAllSNH}
        albums={albums}
      />
    </div>
  );
}

export default App;
