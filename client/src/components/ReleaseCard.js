import React from 'react';

import { 
        Card,
        Button,
    }from 'react-bootstrap';

const ReleaseCard = ({album})=>{

    return(
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={album.imageUrl} />
            <Card.Body>
                <Card.Title>{`${album.artist} - ${album.title}`}</Card.Title>
                <Card.Text>
                    {album.releaseDate?
                    `Released: ${album.releaseDate}`
                    :null}
                    <br/>
                    {album.upc?
                    `upc: ${album.upc}`
                    :null}
                    <br/>
                    {album.tags?
                    album.tags.map(tag=>`#${tag} `)
                    :null}
                    <br/>
                    {album.itemType==='album'?
                        album.tracks.map(track=>`${track.trackNum}. ${track.title}\t ${Math.floor(track.duration/60)}:${track.duration%60}\t`)
                    :album.tracks.map(track=>`${Math.floor(track.duration/60)}:${track.duration%60}`)
                    }
                </Card.Text>
                <Button variant="primary" href={album.url}>Listen</Button>
            </Card.Body>
        </Card>
    );
}

export default ReleaseCard;