const express = require("express");
const router = express.Router();

const util = require("util");
const bcScraper = require("bandcamp-scraper");
const Monitor = require("ping-monitor");

const isObject = require("lodash/isObject");
const _keys = require("lodash/keys");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const albumSchema = require("../schemas/album");
const albumModel = mongoose.model("album", albumSchema);

const labels = [
  {
    name: "Saturn Ashes",
    short: "snh",
    url: `https://saturnashes.bandcamp.com`,
    albumUrls: [],
    albumData: [],
    metaAlbumData: [],
  },
  {
    name: "Outer Ring",
    short: "snhouter",
    url: `https://snhouter.bandcamp.com`,
    albumUrls: [],
    albumData: [],
    metaAlbumData: [],
  },
];

const isUpToDate = (fresh, staged) => {
  const BreakEx = {};
  try {
    _keys(fresh).map((key) => {
      const areObjects = isObject(fresh[key]) && isObject(staged._doc[key]);
      if (
        (areObjects && !isUpToDate(fresh[key], staged._doc[key])) ||
        (!areObjects && fresh[key] != staged._doc[key])
      ) {
        console.log(
          `${key} is outdated for [${fresh.artist} - ${fresh.title}]. Old:${staged._doc[key]}, New:${fresh[key]}`
        );
        throw BreakEx;
      }
    });
  } catch (e) {
    if (e === BreakEx) return false;
  }
  return true;
};

const pushAlbumsToDatabase = (albums) => {
  const ids = [];
  albums.map((album) => {
    ids.push(album.id);
    const curAlbum = new albumModel({ ...album });
    albumModel.findOne({ id: curAlbum.id }, (err, doc) => {
      if (!err) {
        if (!doc) {
          doc = curAlbum;
          console.log(
            `New release found: ${curAlbum.title} by ${curAlbum.artist}`
          );
          doc.save((err) => (err ? console.log(err) : null));
        } /*if (!isUpToDate(alInfo, doc))*/ else {
          albumModel.updateOne({ id: curAlbum.id }, album, (err, res) =>
            err ? console.log(err) : null
          );
          //console.log(`Updated: ${curAlbum.title} by ${curAlbum.artist}`);
        }
      }
    });
  });
  albumModel.deleteMany(
    { id: { $nin: ids }, label: { name: albums[0].label.name } },
    (err, res) => {
      if (err) console.log(err);
      else if (res.deletedCount > 0)
        console.log(`Removed ${res.deletedCount} releases`);
    }
  );
};

const snhMonitor = new Monitor({
  website: `https://saturnashes.bandcamp.com`,
  title: "Saturn Ashes",
  interval: 30,
});
snhMonitor.on("up", async (res, state) => {
  console.log(`${res.website} is up`);

  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: Updating data for ${
      snhMonitor.title
    }...`
  );
  let currentLabel = labels.find((lbl) => lbl.name === snhMonitor.title);

  const geturls = util.promisify(bcScraper.getAlbumUrls);
  const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

  var urlsList = await geturls(currentLabel.url);
  await Promise.all(urlsList).then((urls) => {
    currentLabel.albumUrls = urls; //placing urls
  });

  var albumsList = currentLabel.albumUrls.map(async (url) => {
    return await getAlbumInfo(url);
  });
  await Promise.all(albumsList).then((albums) => {
    let albList = [],
      metaList = [];
    albums.map(async (album) => {
      const alInfo = composeAlbumInfo(album, {
        name: snhMonitor.title,
        website: snhMonitor.website,
      });
      // const curAlbum = new albumModel({
      //   ...composeAlbumInfo(album, {
      //     name: snhMonitor.title,
      //     website: snhMonitor.website,
      //   }),
      // });
      // albumModel.findOne({ id: curAlbum.id }, (err, doc) => {
      //   if (!err) {
      //     if (!doc) {
      //       doc = curAlbum;
      //       console.log(
      //         `New release found: ${curAlbum.title} by ${curAlbum.artist}`
      //       );
      //       doc.save((err) => (err ? console.log(err) : null));
      //     } /*if (!isUpToDate(alInfo, doc))*/ else {
      //       albumModel.updateOne({ id: curAlbum.id }, alInfo, (err) =>
      //         err ? console.log(err) : null
      //       );
      //       //console.log(`Updated: ${curAlbum.title} by ${curAlbum.artist}`);
      //     }
      //   }
      // });
      albList = [...albList, alInfo];
      const curAlbumMeta = new albumModel({
        ...composeMetaAlbumInfo(album, {
          name: snhMonitor.title,
          website: snhMonitor.website,
        }),
      });
      metaList = [...metaList, curAlbumMeta];
    });

    pushAlbumsToDatabase(albList);
    currentLabel.albumData = albList; //placing info objects
    currentLabel.metaAlbumData = metaList;

    console.log(
      `[${new Date(Date.now()).toLocaleString()}]: ${snhMonitor.title} updated`
    );
  });
});
snhMonitor.on("error", (error) =>
  console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`)
);
snhMonitor.on("down", (res, state) => {
  console.log(`${res.website} is down`);
});

const snhouterMonitor = new Monitor({
  website: `https://snhouter.bandcamp.com`,
  title: "Outer Ring",
  interval: 30,
});
snhouterMonitor.on("up", async (res, state) => {
  console.log(`${res.website} is up`);

  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: Updating data for ${
      snhouterMonitor.title
    }...`
  );
  let currentLabel = labels.find((lbl) => lbl.name === snhouterMonitor.title);

  const geturls = util.promisify(bcScraper.getAlbumUrls);
  const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

  var urlsList = await geturls(currentLabel.url);
  await Promise.all(urlsList).then((urls) => {
    currentLabel.albumUrls = urls; //placing urls
  });

  var albumsList = currentLabel.albumUrls.map(async (url) => {
    return await getAlbumInfo(url);
  });
  await Promise.all(albumsList).then((albums) => {
    let albList = [],
      metaList = [];
    albums.map(async (album) => {
      const alInfo = composeAlbumInfo(album, {
        name: snhouterMonitor.title,
        website: snhouterMonitor.website,
      });
      // const curAlbum = new albumModel({
      //   ...composeAlbumInfo(album, {
      //     name: snhouterMonitor.title,
      //     website: snhouterMonitor.website,
      //   }),
      // });
      // albumModel.findOne({ id: curAlbum.id }, (err, doc) => {
      //   if (!err) {
      //     if (!doc) {
      //       doc = curAlbum;
      //       console.log(
      //         `New release found: ${curAlbum.title} by ${curAlbum.artist}`
      //       );
      //       doc.save((err) => (err ? console.log(err) : null));
      //     } /*if (!isUpToDate(alInfo, doc))*/ else {
      //       albumModel.updateOne({ id: curAlbum.id }, alInfo, (err) =>
      //         err ? console.log(err) : null
      //       );
      //       //console.log(`Updated: ${curAlbum.title} by ${curAlbum.artist}`);
      //     }
      //   }
      // });
      albList = [...albList, alInfo];
      const curAlbumMeta = new albumModel({
        ...composeMetaAlbumInfo(album, {
          name: snhouterMonitor.title,
          website: snhouterMonitor.website,
        }),
      });
      metaList = [...metaList, curAlbumMeta];
    });
    pushAlbumsToDatabase(albList);
    currentLabel.albumData = albList; //placing info objects
    currentLabel.metaAlbumData = metaList;

    console.log(
      `[${new Date(Date.now()).toLocaleString()}]: ${
        snhouterMonitor.title
      } updated`
    );
  });
});
snhouterMonitor.on("error", (error) =>
  console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`)
);
snhouterMonitor.on("down", (res, state) => {
  console.log(`${res.website} is down`);
});

const composeAlbumInfo = (albumData, label) => {
  return {
    artist: albumData.artist,
    title: albumData.title,
    imageUrl: albumData.imageUrl,
    tags: albumData.tags.map((tag) => tag.name),
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
    tracks: albumData.raw.trackinfo.map((track) => {
      return {
        title:
          track.title.split("-").length === 1
            ? track.title
            : track.title.split("-")[1].trim(),
        artist:
          track.title.split("-").length === 1
            ? albumData.artist
            : track.title.split("-")[0].trim(),
        id: track.id,
        duration: Math.floor(track.duration),
        file: track.file["mp3-128"],
        trackNum: track.track_num,
      };
    }),
    upc: albumData.raw.current.upc,
    isrc: albumData.raw.current.isrc,
    releaseDate: Date.parse(albumData.raw.current.release_date),
    about: albumData.raw.current.about,
    credits: albumData.raw.current.credits,
    label: label,
  };
};

const composeMetaAlbumInfo = (albumData, label) => {
  return {
    artist: albumData.artist,
    title: albumData.title,
    imageUrl: albumData.imageUrl,
    id: albumData.raw.id,
    label: label,
    releaseDate: Date.parse(albumData.raw.current.release_date),
  };
};

router.get("/labels", (req, res, next) => {
  res.json(labels.map((label) => ({ name: label.name, url: label.url })));
});

router.get("/getUrls", async (req, res, next) => {
  res.json(await getUrls(labels));
});

router.get("/getAllFromLabel/:label", async (req, res, next) => {
  albumModel.find({ "label.name": req.params.label }, (err, docs) => {
    res.json(docs);
  });
});

router.get("/getAllMetaFromLabel/:label", async (req, res, next) => {
  albumModel.find(
    { "label.name": req.params.label },
    "artist title imageUrl id releaseDate label",
    (err, docs) => {
      res.json(docs);
    }
  );
});

router.get("/getAll", async (req, res, next) => {
  albumModel.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.get("/getAllMeta", async (req, res, next) => {
  albumModel.find(
    {},
    "artist title imageUrl id releaseDate label",
    (err, docs) => {
      res.json(docs);
    }
  );
});

router.get("/getLatestFromLabel/:label", async (req, res, next) => {
  const count = 5;
  albumModel
    .find(
      { "label.name": req.params.label },
      "artist title imageUrl id releaseDate label url"
    )
    .sort({ releaseDate: -1 })
    .limit(count)
    .exec((err, docs) => {
      res.json(docs);
    });
});

router.get("/getFullAlbum/:id", async (req, res, next) => {
  albumModel.findOne({ id: req.params.id }, (err, doc) => {
    res.json(doc);
  });
});

router.get("/getRawAlbum", async (req, res, next) => {
  const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);
  res.json(
    await getAlbumInfo("https://saturnashes.bandcamp.com/album/zen-vol-5")
  );
});

module.exports = router;
