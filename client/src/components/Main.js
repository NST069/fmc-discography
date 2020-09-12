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
                    <div 
                        className="mt-3 mb-60" 
                        style={{ paddingBottom: 60}} //footer height
                    >
                    {
                        loading
                        ?
                            <Spinner animation="grow" variant={darkMode?"dark":"light"}/>
                        :
                            albums.map(album=>
                                <div key={album.id} style={{display: 'inline-block', width:'350px', margin:'5px'}}>
                                    <ReleaseCard key={album.id}
                                        darkMode={darkMode}
                                        album={album}
                                    />
                                </div>
                                )
                    }
                    </div>
                    </Route>
                    <Route path='/:id' component={relPage}/>
                </Router>
            </div>
        </div>
    );
}

export default Main;