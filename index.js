#!/usr/bin/env node

const request = require("request"); // package to make API request
const {
  getWittyMessage,
  getHumorMessage,
  createJokesFile,
} = require("./utils/helper");
const {
  updateJokesLeaderboard,
  getPopularJoke,
} = require("./utils/leaderboards");

// getting the search keyword from cmd line
const inputParameter = process.argv.length >= 3 ? process.argv[2] : "";
const searchTerm = inputParameter.slice(2, inputParameter.length);

if (searchTerm === "leaderboard") {
  getPopularJoke();
} else {
  // options to make api call
  const requestOptions = {
    url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
    headers: {
      "User-Agent": "request",
      Accept: "application/json",
    },
  };

  // to get a random joke using the keyword
  request(requestOptions, async function (error, response, body) {
    if (error) {
      throw new Error("Something went wrong!");
    }

    const responseJokes = JSON.parse(body).results;

    if (responseJokes.length === 0) {
      // getting a witty message since no jokes were found
      const message = getWittyMessage();
      console.log(message);
    } else {
      // pick a random joke and print it
      let n = responseJokes.length - 1;
      let pickedJokeIndex = Math.floor(Math.random() * (n + 1));
      let jokeId = responseJokes[pickedJokeIndex].id;
      let joke = responseJokes[pickedJokeIndex].joke;

      // store the joke in a file
      createJokesFile(joke);

      // update the jokes data for leaderboard
      updateJokesLeaderboard(jokeId, joke);

      // printing the joke with a humorous message
      console.log("\nJoke: ", joke);
      console.log("\nps: ", getHumorMessage() + "\n");
    }
  });
}
