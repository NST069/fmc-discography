const express = require('express');
const router = express.Router();

const Monitor = require('ping-monitor');
const ytch = require('yt-channel-info');

const channelId="UCTIKZV5kjfJ2Hi3tsCUaUag";
let channelInfo={};
let videosInfo=[];

router.get('/channelInfo', (req,res,next) => {
    ytch.getChannelInfo(channelId)
    .then((resp)=>{
        channelInfo = resp;
        res.json(resp);
    })
});

const channelMonitor = new Monitor({
    website: "https://www.youtube.com/channel/UCTIKZV5kjfJ2Hi3tsCUaUag",
    title: "NST069 YT Channel",
    interval: 30,
    expect:{ statusCode:200}
});
channelMonitor.on('up', async(res,state)=>{
    console.log(`${res.website} is up`);

    console.log(`[${new Date(Date.now()).toLocaleString()}]: Updating data for ${channelMonitor.title}...`);

    ytch.getChannelVideos(channelId, 'newest')
    .then(async (videos)=>{
        videosInfo = videos.items;
        let cont = videos.continuation;
        while(cont!==null) {
            await ytch.getChannelVideosMore(cont)
            .then((videos)=>{
                videosInfo = [...videosInfo, ...videos.items];
                cont=videos.continuation;
                //console.log(cont);
            });
        }
        console.log(`[${new Date(Date.now()).toLocaleString()}]: ${channelMonitor.title} updated`);
    });
});
channelMonitor.on('error', (error)=>console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`));

router.get('/getAllVideos', (req,res,next) => {
    res.json(videosInfo);
});

module.exports = router;