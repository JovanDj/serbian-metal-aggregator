var express = require("express");
var router = express.Router();
const { readFile } = require("node:fs/promises");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const urls = JSON.parse(await readFile("data.json", "utf-8"));
  let posts = [];
  urls.forEach((url) => {
    posts = [...posts, ...url.posts];
  });

  posts.map((post) => {
    post.pubDate = new Date(post.pubDate);
    post.pubDate = new Intl.DateTimeFormat("sr-Latn-RS", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(post.pubDate);
  });

  posts = posts.sort((a, b) => a.pubDate > b.pubDate);

  res.render("index", { posts });
});

module.exports = router;
