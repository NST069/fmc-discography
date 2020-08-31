import React from 'react';

import {
    Spinner,
} from 'react-bootstrap';

import ReleaseCard from './ReleaseCard';

const Main = ({darkMode, albums, loading})=>{


    return(
        <div>
            {
                loading
                ? <Spinner animation="border"/>
                :
                <div className="container">
                {albums.map(album=>
                        <ReleaseCard
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