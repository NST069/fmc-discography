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
    if(Date.now() - updated < 1000 * 60 * 60) return labels;

    console.log("Updating data...");
    const geturls = util.promisify(bcScraper.getAlbumUrls);
    var ps = labels.map(async label => {
        return {name: label.name, urls: await geturls(label.url)};
    });
    return Promise.all(ps).then(collection => {
        //var getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);
        collection.map(async item => {
            let label = labels.find(lbl => lbl.name === item.name);
            label.albumUrls = item.urls;
            label.albumData=[];
            //let lbl = labels.find(label => label.name === item.name);
            let albumsInfo = item.urls.map(async url=>{/*
                let albumInfo = [];
                if(labels.albumData){ 
                    
                    let ai = labels.albumData.find(album => album.url === url);
                    //console.log(ai);
                    albumInfo = ai ? ai : await bcScraper.getAlbumInfo(url, (err, res)=>albumInfo = res);
                }
                else await bcScraper.getAlbumInfo(url, (err, res)=>albumInfo=res);
                return albumInfo;
                //return albumInfo ? albumInfo : await getAlbumInfo(url);*/
                //var getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);
                await bcScraper.getAlbumInfo(url, (err,res)=>{
                    label.albumData = [...label.albumData, res];
                    //return res;
                })
            })
        });
        updated = Date.now();
        return labels;
    });
};  

/*
var getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);
        let albums = labels.find(label => label.name === req.params.label).trackUrls;
        var ps = albums.map(album => getAlbumInfo(album));
        return Promise.all(ps).then(collection => res.json(collection));
*/

router.get('/labels', (req, res, next)=>{
    res.json(labels.map(label =>label.name));
});

router.get('/getUrls', async(req, res, next)=>{
    res.json( await getUrls(labels));
});

router.get('/getAllFromLabel/:label', (req, res, next)=>{
    updateTrackdata()
    .then(async(result)=>{
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