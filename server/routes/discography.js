const express = require("express");
const router = express.Router();

const util = require("util");
const bcScraper = require("bandcamp-scraper");

const bcfetch = require("bandcamp-fetch");
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
console.log(mongoose.connection);

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

const pushAlbumToDatabase = (album) => {
    const curAlbum = new albumModel({ ...album });
    albumModel.findOne({ id: curAlbum.id }, (err, doc) => {
      if (!err) {
        if (!doc) {
          doc = curAlbum;
          console.log(
            `New release found: ${curAlbum.title} by ${curAlbum.artist}`
          );
          doc.save((err) => (err ? console.log(err) : null));
        } if (!isUpToDate(album, doc)) {
          albumModel.updateOne({ id: curAlbum.id }, album, (err, res) =>
            err ? console.log(err) : null
          );
          console.log(`Updated: ${curAlbum.title} by ${curAlbum.artist}`);
        }
      }
  });
};

const getAlbumsFromLabel = (monitor) => {
  var albumsList = [];
  var currentLabel = labels.find((lbl) => lbl.name === monitor.title);
  try{
  bcScraper.getAlbumUrls(currentLabel.url, async (err, albumUrls)=>{
    if(err) console.log(err);
    else {
      currentLabel.albumUrls = albumUrls;
      await albumUrls.map((url, i) => {
        bcScraper.getAlbumInfo(url, async(err, albumInfo)=>{
          if(err) console.log(err);
          else {
            const alInfo = composeAlbumInfo(albumInfo, {
              name: monitor.title,
              website: monitor.website,
            });
            albumsList=[...albumsList, alInfo]
            await pushAlbumToDatabase(alInfo);
          }
          if(i>=albumUrls.length-1){
            currentLabel.albumData = albumsList;
            HideMissedAlbums(currentLabel);
            
            console.log(
              `[${new Date(Date.now()).toLocaleString()}]: ${
                monitor.title
              } updated`
            );
          }
        })
      })
    }
  });
}catch(err){
    console.log(
      `[${new Date(Date.now()).toLocaleString()}]: Exception: ${err.message}`
    );
  }
}

const UpdateAlbum = (album) => {
  albumModel.updateOne({ id: album.id }, album, (err, res) =>
    err ? console.log(err) : null
  );
};

const HideMissedAlbums = (label)=>{
  albumModel.updateMany({id: {$nin: [...label.albumData.map(a=>a.id)]}, label: {name: label.name}}, { $set: { isAvailable: false } }, (err, res)=>{
    err ? console.log(err) : null
  })

}

const FixImageUrl = (url, albList) => {
  return new Promise((resolve, reject) => {
    bcfetch
      .getAlbumInfo(url)
      .then(
        (alb) => {
          //album cover fix (temp)
          let ai = albList.findIndex((a) => a.url == alb.url);
          albList[ai].imageUrl = alb.imageUrl;
          UpdateAlbum(albList[ai]);
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      )
      .catch((err) => {
        reject(err.message);
      });
  });
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

  getAlbumsFromLabel(snhMonitor);
});
snhMonitor.on("error", (error) =>
  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: ${snhMonitor.title}: ${error}`
  )
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

  getAlbumsFromLabel(snhouterMonitor);
});
snhouterMonitor.on("error", (error) =>
  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: ${
      snhouterMonitor.title
    }: ${error}`
  )
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
    isAvailable: true,
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
  albumModel
    .find({})
    .sort({ releaseDate: -1 })
    .exec((err, docs) => {
      res.json(docs);
    });
});

router.get("/getAllMeta", async (req, res, next) => {
  albumModel
    .find({}, "artist title imageUrl id releaseDate label")
    .sort({ releaseDate: -1 })
    .exec((err, docs) => {
      res.json(docs);
    });
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
    await getAlbumInfo("https://saturnashes.bandcamp.com/album/railgun")
  );
});

var fs = require("fs");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
var log_stdout = process.stdout;

console.log = function (d) {
  //
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};

let rrr = [];
router.get("/testDiscog", async (req, res, next) => {
  bcfetch.getDiscography(`https://snhouter.bandcamp.com`).then((r) => {
    console.log(`[${new Date(Date.now()).toLocaleString()}]: r:`);
    console.log(r);
    r.map((item, idx) => {
      bcfetch.getAlbumInfo(item.url).then((ai) => {
        console.log(`[${new Date(Date.now()).toLocaleString()}]: item_${idx}:`);
        console.log(ai);
        rrr = [...rrr, ai];
        //console.log(rrr);
      });
    }).then(() => {
      console.log(`[${new Date(Date.now()).toLocaleString()}]: rrr:`);
      console.log(rrr);
      res.json(rrr);
    });
  });
});

router.get("/discogGet", async (req, res, next) => res.json(rrr));

router.get("/testDiscog2", async (req, res, next) => {
  const geturls = util.promisify(bcScraper.getAlbumUrls);
  const getAlbumInfo = util.promisify(bcScraper.getAlbumInfo);

  var urlsList = await geturls(`https://snhouter.bandcamp.com`);
  console.log(`[${new Date(Date.now()).toLocaleString()}]: urls:`);
  console.log(urlsList);
  var albumsList = urlsList.map(async (url) => {
    return await getAlbumInfo(url);
  });
  await Promise.all(albumsList).then((albums) => {
    console.log(`[${new Date(Date.now()).toLocaleString()}]: albums:`);
    console.log(albums);
    res.json(albums);
  });
});

module.exports = router;
