import React, {useState} from 'react';

import { Link } from "react-router-dom";

import { 
        Card,
        Image,
        Table,
        Badge,
        Container,
        Row,
        Col,
        Button,
        Modal,
}from 'react-bootstrap';

const ReleasePage = ({darkMode, album})=>{

    const [modalShow, setModalShow] = useState(false);

    return(
        <Card className="mt-3 mb-6" key={album.id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"}>
            <Card.Header className="font-weight-bold">
                <Link to='/'>
                    <Button
                        block
                        size="sm"
                        variant={darkMode?"secondary":"outline-secondary"}
                    >
                    Back</Button>
                </Link>
                {`${album.artist} - ${album.title}`}
            </Card.Header>
            <Container style={{margin:'5px'}}>
                <Row className="justify-content-md-center mb-2">
                    {album.tags?
                        album.tags.map(tag=> 
                            <Col xs="auto" md="auto" key={tag}>
                                <Badge pill variant={darkMode?"secondary":"white"} key={tag}>{`#${tag}`}</Badge>
                            </Col>)
                        :null
                    }
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <a href={album.url}><Image
                            fluid
                            className="mr-3"
                            src={album.imageUrl}
                            alt={`${album.artist} - ${album.title}`}
                            rounded
                        /></a>
                        <Button
                            block
                            size="lg"
                            variant={darkMode?"secondary":"outline-secondary"}
                            onClick={()=>setModalShow(true)}
                        >Listen</Button>
                        <Modal
                            show={modalShow}
                            onHide={()=>setModalShow(false)}
                            size="auto"
                            centered
                        >
                            <Modal.Body className={darkMode?"bg-secondary":"bg-white"}>
                                <iframe style={{border: "0", width: "100%", height: (album.itemType==="track")?"120px":`${120 + 37*album.tracks.length}px` }} title={album.id}
                                src={`https://bandcamp.com/EmbeddedPlayer/${album.itemType}=${album.id}/size=large/bgcol=${(darkMode)?'333333':'ffffff'}/linkcol=0f91ff/artwork=small/transparent=true/`} 
                                seamless>
                                    <a href={album.url}>{album.name} by {album.artist}</a>
                                </iframe>
                            </Modal.Body>
                        </Modal>
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
            <small className={darkMode?"text-light":"text-muted"}>
                {album.releaseDate?
                    `Released: ${new Date(album.releaseDate).toDateString()} `
                :''}
                {album.upc?
                    `upc: ${album.upc} `
                :''}
            </small>
            </Card.Footer>
        
        </Card>

    );
}

export default ReleasePage;