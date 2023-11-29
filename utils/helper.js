const { error } = require("console");
var fs = require("fs"); //moudle to read and write files

// function to give witty messages
const getWittyMessage = () => {
  const wittyMessageArray = [
    "The God of jokes is taking a day off :(",
    "Why do you want a joke when your life itself is one!",
    "I only give jokes to smart people!",
  ];
  let n = wittyMessageArray.length;

  return wittyMessageArray[Math.floor(Math.random() * n)];
};

// function to give humorous messages
const getHumorMessage = () => {
  const funnyMessageArray = [
    "Hire me and I will tell you a joke everyday xD",
    "I know the API is free, but how bored are you?",
    "no jokes can make you happy",
  ];
  let n = funnyMessageArray.length;

  return funnyMessageArray[Math.floor(Math.random() * n)];
};

// creating a new file to store the jokes
const createJokesFile = (joke) => {
  let textToAppend = `${joke}\n`;
  fs.appendFile("./All_jokes.txt", textToAppend, function (err) {
    if (err) throw err;
  });
};

// function to update leaderboard file
const updateLeaderBoardFile = (content) => {
  fs.writeFile("./popularJokes.txt", content, function (err) {
    if (err) throw err;
  });
};

module.exports = {
  getWittyMessage,
  getHumorMessage,
  createJokesFile,
  updateLeaderBoardFile,
};
