import React from 'react';

import ReactPlayer from 'react-player/lazy';

const VideoCard = ({id})=>{

    return(
        <div className="p-4">
            <div style={{position:'relative', paddingTop:'56.25%'}}>
                <ReactPlayer key={id} style={{position:'absolute', top:0, left:0}} light url={`https://www.youtube.com/watch?v=${id}`} width='100%' height='100%' controls/>
            </div>
        </div>
    );
}

export default VideoCard;