import React, {useState} from 'react';

import {
    Navbar,
} from 'react-bootstrap';

//import ReactJkMusicPlayer from 'react-jinke-music-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PlayerFooter = ({darkMode, playlist})=>{
    
    const [currentTrackId, setCurrentTrackId] = useState(0);

    return(
        <Navbar 
                variant={darkMode?"dark":"light"}
                bg={darkMode?"dark":"light"}
                fixed="bottom"
        >
            <AudioPlayer 
                showSkipControls
                autoPlay={false}
                src={(playlist.length>0)?playlist[currentTrackId].url:""}
                header={(playlist.length>0)?`Now playing: ${playlist[currentTrackId].name}`:"No tracks in playlist"}
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
        </Navbar>
    );
}

export default PlayerFooter;
