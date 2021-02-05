import React from 'react';

import { Link } from "react-router-dom";

const ReleaseCard = ({album, getAlbumById, openModal})=>{

    return(
       <div className="release-card">
            <img className="release-cover" src={album.imageUrl} alt={`${album.artist} - ${album.title}`}/>
            <p className="release-p release-title">{album.title}</p>
            <p className="release-p release-artist">{album.artist}</p>
            <button onClick={(event)=>{
                event.preventDefault();
                getAlbumById(album.id);
                openModal();
            }} className="button button-dark">Show</button>
        </div>
    );
}

export default ReleaseCard;