import React from 'react';

import {
    Card,
} from 'react-bootstrap';

import ReactPlayer from 'react-player/lazy';

const VideoCard = ({id, darkMode})=>{

    return(
        <Card className="mt-3 mb-6" key={id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"} style={{position:'relative', paddingTop:'56.25%'}}>
            <ReactPlayer key={id} style={{position:'absolute', top:0, left:0}} light url={`https://www.youtube.com/watch?v=${id}`} width='100%' height='100%' />
        </Card> 
    );
}

export default VideoCard;