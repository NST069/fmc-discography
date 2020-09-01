import React from 'react';

import {
    Spinner,
} from 'react-bootstrap';

import ReleaseCard from './ReleaseCard';

const Main = ({darkMode, albums, loading})=>{


    return(
        <div style={{minHeight:"100vh"}}>
            {
                loading
                ?
                    <Spinner animation="grow" variant={darkMode?"dark":"light"}/>
                :
                <div className="container">
                {albums.map(album=>
                        <ReleaseCard key={album.id}
                            darkMode={darkMode}
                            album={album}
                        />
                    )}
                </div>
            }
        </div>
    );
}

export default Main;