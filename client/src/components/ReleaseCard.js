import React from 'react';

import { 
        Card,
        Image,
        Table,
        Badge,
        Container,
        Row,
        Col,
    }from 'react-bootstrap';

const ReleaseCard = ({darkMode, album})=>{

    return(
        /*
        {album.upc?
        `upc: ${album.upc}`
        :null}
        */
        <Card className="mt-3 mb-6" key={album.id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"}>
            <Card.Header className="font-weight-bold">{`${album.artist} - ${album.title}`}</Card.Header>
            <Container style={{margin:'5px'}}>
                <Row className="justify-content-md-center mb-2">
                    {album.tags?
                        album.tags.map(tag=> 
                            <Col md="auto" key={tag}>
                                <Badge pill variant={darkMode?"secondary":"white"} style={{margin:'2px'}} key={tag}>{`#${tag}`}</Badge>
                            </Col>)
                        :null
                    }
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <a href={album.url}><Image
                            fluid
                            className="mr-3"
                            src={album.imageUrl}
                            alt={`${album.artist} - ${album.title}`}
                            rounded
                        /></a>
                    </Col>
                    <Col xs={12} md={8}>
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
                    </Col>
                </Row>
            </Container>
            <Card.Footer>
            {album.releaseDate?
                <small className={darkMode?"text-light":"text-muted"}>Released: {new Date(album.releaseDate).toDateString()}</small>
            :null}
            </Card.Footer>
        </Card>
    );
}

export default ReleaseCard;