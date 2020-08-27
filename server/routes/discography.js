const express = require('express');
const router = express.Router();

const util = require('util');
const bcScraper = require('bandcamp-scraper');

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

let updated = 0;

const updateTrackdata = async()=>{
    if(Date.now() - updated < 1000 * 60 * 60) return labels; // no need to update

    console.log("Updating data...");
    const geturls = util.promisify(bcScraper.getAlbumUrls);
    const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

    var urlsList = labels.map(async label =>{
        return { name: label.name, urls: await geturls(label.url)};
    });
    await Promise.all(urlsList)
    .then(collection=>{
        collection.map(label=>{
            let currentLabel = labels.find(lbl=>lbl.name===label.name);
            currentLabel.albumUrls = label.urls; //placing urls
            currentLabel.albumData=[]; // TODO: Instead of rewriting the whole array, add/remove not listed
        })
    });
    var albumsList = labels.map(async label => {
        let aInfo = label.albumUrls.map(async url=>{
            return {name: label.name, data: await getAlbumInfo(url)};
        });
        await Promise.all(aInfo)
        .then((collection)=>{
            collection.map(label=>{
                if(label===null) return; // TODO: reload
                let currentLabel = labels.find(lbl=>lbl.name===label.name);
                currentLabel.albumData = [...currentLabel.albumData, composeAlbumInfo(label.data)]; //placing info objects
            });
        })
    });
    await Promise.all(albumsList)
    .then((res)=>{
        updated = Date.now();
        console.log("Done");
    });
};

const composeAlbumInfo = (albumData)=>{
    return {
        artist: albumData.artist,
        title: albumData.title,
        imageUrl: albumData.imageUrl,
        tags: albumData.tags.map(tag => tag.name),
        url: albumData.url,
        id: albumData.raw.id,
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
        releaseDate: Date.parse(albumData.raw.current.release_date),
    };
}

router.get('/labels', (req, res, next)=>{
    res.json(labels.map(label =>label.name));
});

router.get('/getUrls', async(req, res, next)=>{
    res.json( await getUrls(labels));
});

router.get('/getAllFromLabel/:label', (req, res, next)=>{
    updateTrackdata()
    .then(async(result)=>{
        //console.log(labels);
        let albums = await labels.find(label => label.name === req.params.label).albumData;
        res.json(albums);
    });
});

router.get('/getAll', (req, res, next)=>{
    updateTrackdata()
    .then(async(result)=>{
        let albums = [];
        await labels.map((label)=>label.albumData).map(a=>albums.push(...a))
        res.json(albums);
    })

});

module.exports = router;