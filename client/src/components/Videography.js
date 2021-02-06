import React, {useEffect} from 'react';

import VideoCard from './VideoCard';
import Loading from './Loading';

const Videography = ({loading, videos, getVideos})=>{

    useEffect(()=>{
        getVideos();
    }, []);

    return(<>
        {loading?
            <Loading/>
        :videos.map((video)=>
            <div key={video.videoId}>
                <VideoCard 
                    id={video.videoId}
                />
            </div>
        )}</>
    );
}

export default Videography;