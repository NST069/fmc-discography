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

    const validUrl = (url)=>{ // TODO: make gloal if necessary
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(url.trim());
     }

    return(
        <Card className="mt-3 mb-6" key={album.id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"}>
            <Card.Header className="font-weight-bold">
                <Link 
                    to='/'
                    style={{ textDecoration: 'none' }}
                >
                    <Button
                        block
                        size="sm"
                        variant={darkMode?"secondary":"outline-secondary"}
                    >
                    Back</Button>
                </Link>
                <h1 className='display-4'>{`${album.artist} - ${album.title}`}</h1>
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
                        <a 
                            href={album.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Image
                            fluid
                            className="mr-3"
                            src={album.imageUrl}
                            alt={`${album.artist} - ${album.title}`}
                            rounded
                        /></a>
                        {(album.itemType==="album")?
                            <Button
                                block
                                size="lg"
                                variant={darkMode?"secondary":"outline-secondary"}
                                onClick={()=>setModalShow(true)}
                            >Listen</Button>
                        :  null
                        }
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
                        {(album.itemType==="track")?
                            <iframe style={{border: "0", width: "100%", height: "120px" }} title={album.id}
                            src={`https://bandcamp.com/EmbeddedPlayer/${album.itemType}=${album.id}/size=large/bgcol=${(darkMode)?'333333':'ffffff'}/linkcol=0f91ff/artwork=small/transparent=true/`} 
                            seamless>
                                <a href={album.url}>{album.name} by {album.artist}</a>
                            </iframe>
                        :<Table striped bordered hover size="sm" variant={darkMode?"dark":"light"}>
                            <tbody>
                                {album.tracks.map(track=>
                                    <tr key={track.id}>
                                        <td>{track.trackNum}</td>
                                        <td>{track.title}</td>
                                        <td>{`${Math.floor(track.duration/60)}:${(track.duration%60<10?'0':'')+track.duration%60}`}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>}
                        {album.about?
                            album.about.split("\n").map((str, id)=>
                            validUrl(str)?
                                <a 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={darkMode?"text-light":"text-muted"} 
                                    style={{ textDecoration: 'none' }}
                                    href={str}>{str}</a>
                                :<p key={id}>{str}</p>
                            )
                        :''}
                        {album.credits?
                            album.credits.split("\n").map((str, id)=>
                                validUrl(str)?
                                    <a 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={darkMode?"text-light":"text-muted"} 
                                        style={{ textDecoration: 'none' }}
                                        href={str}>{str}</a>
                                    :<p key={id}>{str}</p>
                            )
                        :''}
                    </Col>
                </Row>
            </Container>
            <Card.Footer>
            <a 
                className={darkMode?"text-light":"text-muted"} 
                style={{ textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
                href={album.label.website}>{album.label.name}</a>
            <small className={darkMode?"text-light":"text-muted"}>
                {album.releaseDate?
                    ` Released: ${new Date(album.releaseDate).toDateString()}`
                :''}
                {album.upc?
                    ` UPC: ${album.upc}`
                :''}
                {album.isrc?
                    ` ISRC: ${album.isrc}`
                :''}
            </small>
            </Card.Footer>
        
        </Card>

    );
}

export default ReleasePage;