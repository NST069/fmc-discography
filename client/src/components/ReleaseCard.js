import React from 'react';

import { Link } from "react-router-dom";

const ReleaseCard = ({album})=>{

    return(
       <div className="release-card">
            <img className="release-cover" src={album.imageUrl} alt={`${album.artist} - ${album.title}`}/>
            <p className="release-p release-title">{album.title}</p>
            <p className="release-p release-artist">{album.artist}</p>
            <Link 
                to={`/${album.id}`}
                style={{ textDecoration: 'none' }}
                ><button className="button button-dark">Show</button>
            </Link>
        </div>
    );
}

export default ReleaseCard;