import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {
    Spinner, 
} from 'react-bootstrap';

import ReleaseCard from './ReleaseCard';
import ReleasePage from './ReleasePage';

const Main = ({darkMode, albums, loading})=>{

    const relPage = (props)=>{
        const id = parseInt(props.match.params.id, 10)
        const album = albums.find(album => album.id === id);
        return (album !== undefined)
        ? <ReleasePage
                darkMode={darkMode}
                album={album}
            />
        :  null;
    };

    return(
        <div style={{minHeight:"100vh"}}>
            <div className="container">
                <Router>
                    <Route exact path="/">
                    {
                        loading
                        ?
                            <Spinner animation="grow" variant={darkMode?"dark":"light"}/>
                        :
                        <div className="container" align="center">
                            {albums.map(album=>
                                <ReleaseCard key={album.id}
                                    darkMode={darkMode}
                                    album={album}
                                />
                                )}
                        </div>
                    }
                    </Route>
                    <Route path='/:id' component={relPage}/>
                </Router>
            </div>
        </div>
    );
}

export default Main;