import React, {useState} from 'react';

import {
    Popover,
    ListGroup,
    OverlayTrigger,
    Button,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useMediaQuery } from 'react-responsive';

const PlayerFooter = ({darkMode, playlist, deleteFromPlaylist})=>{
    
    const [currentTrackId, setCurrentTrackId] = useState(0);

    const playlistIcon = <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-music-note-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
        <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
        <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
    </svg>;

    const deleteIcon = <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>;

    const isMd = useMediaQuery({ query: '(max-width: 768px)' });
    const isSm = useMediaQuery({ query: '(max-width: 576px)' });

    const Playlist = (
        <Popover id="popover-basic" width="auto">
          <Popover.Title as="h3">Playlist</Popover.Title>
          <Popover.Content>
            {(playlist.length>0)?
                <ListGroup>
                    {playlist.map(track=>
                        <ListGroup.Item key={track.id}>
                            <Container>
                                <Row>
                                    <Col >
                                        <p onClick={()=>{setCurrentTrackId(playlist.findIndex(t=>t.id === track.id))}}>{track.name}</p>
                                    </Col>
                                    <Col md="auto" >
                                        <Button size="sm" variant ="light" onClick={()=>deleteFromPlaylist(track.id)}>{deleteIcon}</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>  
                    )}
                </ListGroup>
            :"Empty"}
          </Popover.Content>
        </Popover>
      );

    return(
        <div style={{position:"fixed", left: "0", bottom: "0", width: "100%"}}>
            <AudioPlayer 
                showSkipControls
                autoPlay={false}
                layout={isMd?"stacked":"horizontal"}
                src={(playlist.length>0)?playlist[currentTrackId].url:""}
                customVolumeControls = {(isSm)?[]:[RHAP_UI.VOLUME]}
                header={(playlist.length>0)?`Now playing: ${playlist[currentTrackId].name}`:"No tracks in playlist"}
                customAdditionalControls={[
                    RHAP_UI.LOOP,
                    <OverlayTrigger trigger="click" placement="top" overlay={Playlist}>
                        <Button variant="outline-secondary" size="sm">{playlistIcon}</Button>
                    </OverlayTrigger>,
                ]}
                onClickPrevious={()=>{
                    setCurrentTrackId((currentTrackId - 1)%playlist.length);
                }}
                onClickNext={()=>{
                    setCurrentTrackId((currentTrackId + 1)%playlist.length);
                }}
                onEnded={()=>{
                    setCurrentTrackId((currentTrackId + 1)%playlist.length);
                }}
            />
        </div>
    );
}

export default PlayerFooter;
