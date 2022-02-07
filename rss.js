const { writeFile } = require("node:fs/promises");
const Parser = require("rss-parser");
const parser = new Parser();

(async () => {
  const urls = [
    "https://headliner.rs/feed/",
    "http://www.hellycherry.com/feeds/posts/default",
    "https://www.serbian-metal.org/feed/",
    "https://highwaystarmagazine.org/feed/",
    "http://metaljacketmagazine.com/feed/",
    "https://www.hardwiredmagazine.com/feed/",
    "http://remixpress.com/feed/",
    "https://www.pris.rs/feed/",
    "https://balkanrock.com/feed/",
  ];

  let data = [];

  for await (const url of urls) {
    const feed = await parser.parseURL(url);
    data = [
      ...data,
      {
        title: feed.title,
        link: feed.link,
        description: feed.description,

        posts: feed.items.map((item) => {
          return {
            publisher: {
              title: feed.title,
              link: feed.link,
              description: feed.description,
              image: feed.image,
            },
            title: item.title,
            pubDate: new Date(item.isoDate),
            content: item.content,
            link: item.link,
            author: item.creator,
            categories: item.categories,
          };
        }),
      },
    ];
  }

  await writeFile("./data.json", JSON.stringify(data), "utf-8");
})();
