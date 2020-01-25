const express = require("express");
const morgan = require("morgan");
const playstoreData = require("./playstore-data");

const app = express();

app.use(morgan("common")); // let's see what 'common' format looks like

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;
  const sortOptions = ["Rating", "App"];
  if (sort) {
    if (!sortOptions.includes(sort)) {
      return res
        .status(400)
        .send('"Sort" must be selected as "rating" or "app"');
    }
  }
  const genreOptions = [
    "Action",
    "Puzzle",
    "Strategy",
    "Casual",
    "Arcade",
    "Card"
  ];
  if (genres) {
    if (!genreOptions.includes(genres)) {
      return res
        .status(400)
        .send(`Genre must be one of the following: ${genreOptions.join(" ")} `);
    }
  }

  let results = playstoreData.filter(app => app.Genres.includes(genres));

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
