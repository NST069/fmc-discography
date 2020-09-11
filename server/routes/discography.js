const express = require('express');
const router = express.Router();

const util = require('util');
const bcScraper = require('bandcamp-scraper');
const Monitor = require('ping-monitor');

// TODO: Update only new ones(which were not presented in older version of albumUrls), remove not presented in albumUrls
// check if data updated???

const labels = [
    {
        name: "Saturn Ashes",
        url: `https://saturnashes.bandcamp.com`,
        albumUrls: [],
        albumData: []
    },
    {
        name: "Outer Ring",
        url: `https://snhouter.bandcamp.com`,
        albumUrls: [],
        albumData: []
    }
];

const snhMonitor = new Monitor({
    website: `https://saturnashes.bandcamp.com`,
    title: 'Saturn Ashes',
    interval: 30
});
snhMonitor.on('up', async(res, state)=>{
    console.log(`${res.website} is up`);
    
    console.log(`[${new Date(Date.now()).toLocaleString()}]: Updating data for Saturn Ashes...`);
    let currentLabel = labels.find(lbl=>lbl.name==='Saturn Ashes');
    
    const geturls = util.promisify(bcScraper.getAlbumUrls);
    const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

    var urlsList = await geturls(currentLabel.url);
    await Promise.all(urlsList)
    .then(urls=>{
        currentLabel.albumUrls = urls; //placing urls
    });

    var albumsList = currentLabel.albumUrls.map(async url=>{
        return await getAlbumInfo(url);
    });
    await Promise.all(albumsList)
    .then((albums)=>{
        let albumsList = [];
        albums.map(album=>
            albumsList = [...albumsList, composeAlbumInfo(album)]
        ); 
        currentLabel.albumData = albumsList;//placing info objects
        
        console.log(`[${new Date(Date.now()).toLocaleString()}]: Saturn Ashes updated`);
    });
});
snhMonitor.on('error', (error)=>console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`));

const snhouterMonitor = new Monitor({
    website: `https://snhouter.bandcamp.com`,
    title: 'Outer Ring',
    interval: 30
});
snhouterMonitor.on('up', async(res, state)=>{
    console.log(`${res.website} is up`);
    
    console.log(`[${new Date(Date.now()).toLocaleString()}]: Updating data for Outer Ring...`);
    let currentLabel = labels.find(lbl=>lbl.name==='Outer Ring');
    
    const geturls = util.promisify(bcScraper.getAlbumUrls);
    const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

    var urlsList = await geturls(currentLabel.url);
    await Promise.all(urlsList)
    .then(urls=>{
        currentLabel.albumUrls = urls; //placing urls
    });

    var albumsList = currentLabel.albumUrls.map(async url=>{
        return await getAlbumInfo(url);
    });
    await Promise.all(albumsList)
    .then((albums)=>{
        let albumsList = [];
        albums.map(album=>
            albumsList = [...albumsList, composeAlbumInfo(album)]
        ); 
        currentLabel.albumData = albumsList; //placing info objects
        
        console.log(`[${new Date(Date.now()).toLocaleString()}]: Outer Ring updated`);
    });
});
snhouterMonitor.on('error', (error)=>console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`));

const composeAlbumInfo = (albumData)=>{
    return {
        artist: albumData.artist,
        title: albumData.title,
        imageUrl: albumData.imageUrl,
        tags: albumData.tags.map(tag => tag.name),
        url: albumData.url,
        id: albumData.raw.id,
        raw: {
            id: albumData.raw.current.id,
            art_id: albumData.raw.current.art_id,
            band_id: albumData.raw.current.band_id,
            encodings_id: albumData.raw.current.encodings_id,
            selling_band_id: albumData.raw.current.selling_band_id,
        },
        itemType: albumData.raw.item_type,
        tracks: albumData.raw.trackinfo.map(track=>{
            return {
                title: track.title,
                id: track.id,
                duration: Math.floor(track.duration),
                //file: track.file.mp3-128,
                trackNum: track.track_num,

            }
        }),
        upc: albumData.raw.current.upc,
        isrc: albumData.raw.current.isrc,
        releaseDate: Date.parse(albumData.raw.current.release_date),
        about: albumData.raw.current.about,
        credits: albumData.raw.current.credits,
    };
}

router.get('/labels', (req, res, next)=>{
    res.json(labels.map(label =>label.name));
});

router.get('/getUrls', async(req, res, next)=>{
    res.json( await getUrls(labels));
});

router.get('/getAllFromLabel/:label', async(req, res, next)=>{
    let albums = await labels.find(label => label.name === req.params.label).albumData;
    res.json(albums);
});

router.get('/getAll', async(req, res, next)=>{
    let albums = [];
    await labels.map((label)=>label.albumData).map(a=>albums.push(...a))
    res.json(albums);

});

module.exports = router;