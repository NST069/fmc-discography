import React from 'react';

import { 
        Card,
        Image,
        Table,
        Media,
        Badge,

    }from 'react-bootstrap';

const ReleaseCard = ({darkMode, album})=>{

    return(
        /*
        {album.upc?
        `upc: ${album.upc}`
        :null}
        */
        <Card className="mt-3 mb-3" key={album.id} bg={darkMode?"secondary":"light"} text={darkMode?"white":"dark"}>
            <Card.Header>{`${album.artist} - ${album.title}`}</Card.Header>
            <Media style={{margin:'5px'}}>
                <a href={album.url}><Image
                    width={200}
                    height={200}
                    className="mr-3"
                    src={album.imageUrl}
                    alt={`${album.artist} - ${album.title}`}
                    rounded
                /></a>
                
                <br/>
                <Media.Body>
                    <p>
                    {
                        album.tags?
                        album.tags.map(tag=> <Badge pill variant={darkMode?"light":"secondary"} style={{margin:'2px'}} key={tag}>{`#${tag}`}</Badge>)
                        :null}
                    </p>
                    <Table striped bordered hover size="sm" variant={darkMode?"dark":"light"}>
                        <tbody>
                            {album.tracks.map(track=>
                                <tr key={track.id}>
                                    <td>{track.trackNum}</td>
                                    <td>{track.title}</td>
                                    <td>{`${Math.floor(track.duration/60)}:${(track.duration%60<10?'0':'')+track.duration%60}`}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    
                </Media.Body>
            </Media>
            <Card.Footer>
            {album.releaseDate?
                <small className="text-muted">Released: {new Date(album.releaseDate).toDateString()}</small>
            :null}
            </Card.Footer>
        </Card>
    );
}

export default ReleaseCard;