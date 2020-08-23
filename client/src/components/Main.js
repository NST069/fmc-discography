import React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    ListGroup,
    Spinner,
} from 'react-bootstrap';

import ReleaseCard from './ReleaseCard';

const Main = ({labels, getAllbyLabel, getAll, albums, loading, sortPosts})=>{


    return(
        <div>
            <ButtonToolbar>
                <ButtonGroup className="mr-2">
                    <Button onClick={(event)=>{
                        event.preventDefault();
                        getAll();
                    }}>All</Button>
                    {
                        labels.map(label=>
                            <Button onClick={(event)=>{
                                event.preventDefault();
                                getAllbyLabel(label);
                            }}>{label}</Button>)
                    }
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                    <Button variant="secondary" onClick={(event)=>{
                        event.preventDefault();
                        sortPosts("artist");
                    }}>by Artist</Button>
                    <Button variant="secondary" onClick={(event)=>{
                        event.preventDefault();
                        sortPosts("title");
                        }}>by Title</Button>
                </ButtonGroup>      
            </ButtonToolbar>
            {
                loading
                ? <Spinner animation="border"/>
                :
                <ListGroup horizontal="xl" classname="my-2">
                    {albums.map(album=>
                        <ListGroup.Item key={album.id}>
                            <ReleaseCard
                                imageUrl={album.imageUrl}
                                artist={album.artist}
                                title={album.title}
                            />
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }
        </div>
    );
}

export default Main;