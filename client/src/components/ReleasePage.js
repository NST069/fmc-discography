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

import { useMediaQuery } from 'react-responsive';

const ReleasePage = ({darkMode, album, addToPlaylist})=>{

    const [modalShow, setModalShow] = useState(false);

    const validUrl = (url)=>{ // TODO: make gloal if necessary
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(url.trim());
    };

    const isMd = useMediaQuery({ query: '(max-width: 768px)' });

    const playIcon = (darkMode)?
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
        :<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
        </svg>;

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
                <p className={isMd?'h1':'display-4'}>{`${album.artist} - ${album.title}`}</p>
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
                                        <td>{track.artist} - {track.title}</td>
                                        <td>
                                            <Button variant={darkMode?"secondary":"outline-secondary"} 
                                                onClick={()=>addToPlaylist({id: track.id, name:`${track.artist} - ${track.title}`, url: track.file})}
                                            >{playIcon}</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
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
                target="_blank"
                rel="noopener noreferrer"
                className={darkMode?"text-light":"text-muted"} 
                style={{ textDecoration: 'none' }}
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