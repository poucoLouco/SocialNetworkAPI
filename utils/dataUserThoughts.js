const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

  const users = [
    {
        "username": "emanresy",
        "email": "liame@gmail.com"
    },
    {
        "username": "dupa",
        "email": "dupka2@gmail.com"
    },
    {
        "username": "sokratNows",
        "email": "nothing@gmail.com"
    },
   
  ];


// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

  const thoughts = [
    {
        "thoughtText": "noThoughts",
        "username": "emptyHad",
        "userId": "456654w"
    },
    {
        "thoughtText": "stillNothing",
        "username": "stillEmpty",
        "userId": "123321q"
    },
    {
        "thoughtText": "maybeBootCamp",
        "username": "maybe",
        "userId": "789987e"
    },
  ];


await User.collection.insertMany(users);

await Thought.collection.insertMany(thoughts);


})