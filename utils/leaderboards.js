var fs = require("fs"); //moudle to read and write files
const { updateLeaderBoardFile } = require("./helper");

const updateJokesLeaderboard = (jokeId, joke) => {
  // read the file of popular jokes
  let jokesData;
  const leaderboardFileExists = fs.existsSync("./popularJokes.txt");
  if (!leaderboardFileExists) {
    fs.writeFile("./popularJokes.txt", "", function (err) {
      if (err) throw err;
    });
  }
  fs.readFile("./popularJokes.txt", "utf8", async function (err, data) {
    if (err) {
      console.log("Something went wrong!");
      return;
    }
    if (data === "") {
      //   let data = [{ id: jokeId, joke: joke, count: 1 }];
      let data = {
        [jokeId]: {
          joke: joke,
          count: 1,
        },
      };
      // update the popularjokes file
      updateLeaderBoardFile(JSON.stringify(data));
    } else {
      jokesData = JSON.parse(data);

      // check if the given joke is present in the jokes array
      if (jokesData[jokeId]) {
        // console.log(jokesData[jokeId].count);
        let newData = {
          ...jokesData,
          [jokeId]: {
            ...jokesData[jokeId],
            count: jokesData[jokeId].count + 1,
          },
        };
        updateLeaderBoardFile(JSON.stringify(newData));
      } else {
        let newData = {
          ...jokesData,
          [jokeId]: {
            joke: joke,
            count: 1,
          },
        };
        updateLeaderBoardFile(JSON.stringify(newData));
      }
    }
  });
};

const getPopularJoke = () => {
  const leaderboardFileExists = fs.existsSync("./popularJokes.txt");
  if (leaderboardFileExists) {
    fs.readFile("./popularJokes.txt", "utf8", async function (err, data) {
      if (err) {
        console.log("Something went wrong!");
        return;
      }

      if (data === "") {
        console.log("Please search a joke to add it to leaderboard!");
      } else {
        let jokesData = JSON.parse(data);
        let maxCount = 0;
        let maxId;
        for (const key in jokesData) {
          if (jokesData[key].count > maxCount) {
            maxCount = jokesData[key].count;
            maxId = key;
          }
        }
        console.log("\nthe joke on the top of leaderboard is: \n");
        console.log(jokesData[maxId].joke);
        console.log(
          "\neven jokes are on top of leaderboard, look at you xD!\n"
        );
      }
    });
  } else {
    console.log("Please search a joke to add it to leaderboard!");
  }
};

module.exports = {
  updateJokesLeaderboard,
  getPopularJoke,
};
