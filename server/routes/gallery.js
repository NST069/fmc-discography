const express = require("express");
const router = express.Router();

const Monitor = require("ping-monitor");
const deviantNode = require("deviantnode");

const clientId = process.env.DA_CLIENTID;
const clientSecret = process.env.DA_CLIENTSECRET;

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const artSchema = require("../schemas/art");
const artModel = mongoose.model("art", artSchema);

let latestDeviations = [];

const pushArtsToDatabase = (arts) => {
  const ids = [];
  arts.map((art) => {
    ids.push(art.artId);
    const model = new artModel(composeArtModel(art));
    artModel.findOne({ artId: art.artId }, (err, doc) => {
      if (!err) {
        if (!doc) {
          doc = model;
          console.log(`New art found: ${art.title}`);
          doc.save((err) => (err ? console.log(err) : null));
        } /*if (!isUpToDate(alInfo, doc))*/ else {
          artModel.updateOne({ artId: art.artId }, art, (err) =>
            err ? console.log(err) : null
          );
          //console.log(`Updated: ${art.title}`);
        }
      }
    });
  });
  artModel.deleteMany({ artId: { $nin: ids } }, (err, res) => {
    if (err) console.log(err);
    else if (res.deletedCount > 0)
      console.log(`Removed ${res.deletedCount} arts`);
  });
};

const composeArtModel = (art) => {
  return {
    deviationId: art.deviationid,
    publishedTime: art.published_time,
    title: art.title,
    url: art.url,
    stats: { comments: art.stats.comments, favourites: art.stats.favourites },
    author: {
      username: art.author.username,
      userId: art.author.userid,
      userIcon: art.author.usericon,
    },
    content: {
      height: art.content.height,
      width: art.content.width,
      fileSize: art.content.filesize,
      src: art.content.src,
    },

    isDeleted: art.is_deleted,
    isDownloadable: art.is_downloadable,
    isMature: art.is_mature,
    isPublished: art.is_published,
  };
};

const DAMonitor = new Monitor({
  website: "https://www.deviantart.com/nst069",
  title: "snh.Art",
  interval: 30,
});

DAMonitor.on("up", async (res, state) => {
  console.log(`${res.website} is up`);

  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: Updating data for ${
      DAMonitor.title
    }...`
  );

  deviantNode
    .getGalleryAllDeviations(clientId, clientSecret, {
      username: "NST069",
    })
    .then(async (res) => {
      latestDeviations = res.results;
      try {
        let hasMore = res.has_more;
        let nextOffset = res.next_offset;
        //console.log(hasMore, nextOffset);
        while (hasMore) {
          await deviantNode
            .getGalleryAllDeviations(clientId, clientSecret, {
              username: "NST069",
              offset: nextOffset,
            })
            .then((nxtres) => {
              latestDeviations = [...latestDeviations, ...nxtres.results];
              hasMore = nxtres.has_more;
              nextOffset = nxtres.next_offset;
              //console.log(hasMore, nextOffset);
            });
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        pushArtsToDatabase(latestDeviations);
        console.log(
          `[${new Date(Date.now()).toLocaleString()}]: ${
            DAMonitor.title
          } updated`
        );
      }
    });
});
DAMonitor.on("error", (error) =>
  console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`)
);

router.get("/getLatest", (req, res) => {
  const count = 5;
  artModel
    .find({})
    .sort({ publishedTime: -1 })
    .limit(count)
    .exec((err, docs) => {
      res.json(docs);
    });
});

module.exports = router;
