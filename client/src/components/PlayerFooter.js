import React, {useState} from 'react';

import {
    Popover,
    OverlayTrigger,
    Button,
    Table,
} from 'react-bootstrap';

import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useMediaQuery } from 'react-responsive';

const PlayerFooter = ({darkMode, playlist, deleteFromPlaylist})=>{
    
    const [currentTrackId, setCurrentTrackId] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(playlist[0]);

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
        <Popover id="popover-basic" style={{maxWidth: '100%'}}>
          <Popover.Title as="h3">Playlist</Popover.Title>
          <Popover.Content>
            {(playlist.length>0)?
            <div className="popover-content" style={{maxHeight: '500px', overflowY: "auto"}}>
                <Table striped bordered hover size="sm" variant="light">
                    <tbody >
                        {playlist.map(track=>
                            <tr key={track.id} >
                                <td onClick={()=>{
                                    setCurrentTrackId(playlist.findIndex(t=>t.id === track.id));
                                    setCurrentTrack(playlist.find(t=>t.id === track.id));
                                }}><p>{track.name}</p></td>
                                <td width="auto">
                                    <Button size="sm" variant ="light" onClick={async()=>{
                                        await deleteFromPlaylist(track.id);
                                        if(track.id === currentTrack.id){
                                            let id = (currentTrackId + 1)%playlist.length;
                                            setCurrentTrackId(id);
                                            setCurrentTrack(playlist[id]);
                                        }
                                    }}>{deleteIcon}</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table> 
            </div>
            :"Empty"}
          </Popover.Content>
        </Popover>
      );

    return(
        <div style={{position:"fixed", left: "0", bottom: "0", width: "100%"}}>
            <AudioPlayer 
                showSkipControls
                autoPlay
                layout={isMd?"stacked":"horizontal"}
                src={currentTrack.url}
                customVolumeControls = {(isSm)?[]:[RHAP_UI.VOLUME]}
                header={(playlist.length>0)?`Now playing: ${currentTrack.name}`:"No tracks in playlist"}
                customAdditionalControls={[
                    RHAP_UI.LOOP,
                    <OverlayTrigger trigger="click" rootClose placement="top" overlay={Playlist}>
                        <Button variant="outline-secondary" size="sm">{playlistIcon}</Button>
                    </OverlayTrigger>,
                ]}
                onClickPrevious={()=>{
                    let id = (currentTrackId-1 >= 0)?currentTrackId-1 : playlist.length-1 - currentTrackId;
                    setCurrentTrackId(id);
                    setCurrentTrack(playlist[id]);
                }}
                onClickNext={()=>{
                    setCurrentTrackId((currentTrackId + 1)%playlist.length);
                    setCurrentTrack(playlist[currentTrackId]);
                }}
                onEnded={()=>{
                    setCurrentTrackId((currentTrackId + 1)%playlist.length);
                    setCurrentTrack(playlist[currentTrackId]);
                }}
            />
        </div>
    );
}

export default PlayerFooter;
