const express = require("express");
const router = express.Router();

const Monitor = require("ping-monitor");
const ytch = require("yt-channel-info");

const isObject = require("lodash/isObject");
const _keys = require("lodash/keys");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const videoSchema = require("../schemas/video");
const videoModel = mongoose.model("video", videoSchema);

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

const channelId = "UCTIKZV5kjfJ2Hi3tsCUaUag";
let channelInfo = {};
let videosInfo = [];

router.get("/channelInfo", (req, res, next) => {
  ytch.getChannelInfo(channelId).then((resp) => {
    channelInfo = resp;
    res.json(resp);
  });
});

const pushVideosToDatabase = (videos) => {
  const ids = [];
  videos.map((video) => {
    ids.push(video.videoId);
    const vid = new videoModel({ ...video });
    videoModel.findOne({ videoId: video.videoId }, (err, doc) => {
      if (!err) {
        if (!doc) {
          doc = vid;
          console.log(`New video found: ${video.title}`);
          doc.save((err) => (err ? console.log(err) : null));
        } /*if (!isUpToDate(alInfo, doc))*/ else {
          videoModel.updateOne({ videoId: video.videoId }, video, (err) =>
            err ? console.log(err) : null
          );
          //console.log(`Updated: ${video.title}`);
        }
      }
    });
  });
  videoModel.deleteMany({ videoId: { $nin: ids } }, (err, res) => {
    if (err) console.log(err);
    else if (res.deletedCount > 0)
      console.log(`Removed ${res.deletedCount} videos`);
  });
};

const channelMonitor = new Monitor({
  website: "https://www.youtube.com/channel/UCTIKZV5kjfJ2Hi3tsCUaUag",
  title: "NST069 YT Channel",
  interval: 30,
  expect: { statusCode: 200 },
});
channelMonitor.on("up", async (res, state) => {
  console.log(`${res.website} is up`);

  console.log(
    `[${new Date(Date.now()).toLocaleString()}]: Updating data for ${
      channelMonitor.title
    }...`
  );

  ytch.getChannelVideos(channelId, "newest").then(async (videos) => {
    videosInfo = videos.items;
    //pushVideosToDatabase(videos.items);
    let cont = videos.continuation;
    try {
      while (cont != null) {
        //console.log(cont);
        await ytch.getChannelVideosMore(cont).then((videos) => {
          videosInfo = [...videosInfo, ...videos.items];
          //pushVideosToDatabase(videos.items);
          cont = videos.continuation;
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      pushVideosToDatabase(videosInfo);
      console.log(
        `[${new Date(Date.now()).toLocaleString()}]: ${
          channelMonitor.title
        } updated`
      );
    }
  });
});
channelMonitor.on("error", (error) =>
  console.log(`[${new Date(Date.now()).toLocaleString()}]: ERROR: ${error}`)
);
channelMonitor.on("down", (res, state) => {
  console.log(`${res.website} is down`);
});

router.get("/getAllVideos", (req, res, next) => {
  // res.json(videosInfo);
  videoModel.find(
    {},
    /* null, { sort: publishedText },*/ (err, docs) => {
      res.json(docs);
    }
  );
});

module.exports = router;
