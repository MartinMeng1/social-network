const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {getRandomReactions,getRandomThought, getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});


  const users = [];

  const thoughts1 = [];
  function getRandomThoughtArray(array) {
    for (let i = 0; i < 20; i++) {
      const reactions = getRandomReactions(5);
      const thought = getRandomThought();
      const userName = getRandomName();

      array.push({
        thought,
        userName,
        reactions,
      });
    }
  }

  getRandomThoughtArray(thoughts1);

  const thoughts2 = [];
  getRandomThoughtArray(thoughts2);
  
  
  // Generate users and add thoughts
  for (let i = 0; i < 10; i++) {
    const userName = getRandomName();
    const email = `${userName.split(' ')[0]}@example.com`;
    const thoughts = i < 5 ? [...thoughts1] : [...thoughts2]; // Add thoughts to the users

    users.push({
      userName,
      email,
      thoughts,
      friends: [], // Initialize an empty friends array for each user
    });
  }

  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts1)

  await Thought.collection.insertMany(thoughts2)
 

 
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

// const generateRandomFriendships = (usersArray) => {
//   for (let i = 0; i < usersArray.length; i++) {
//     let randomFriendsCount = Math.floor(Math.random() * 5) + 1;
//     const randomFriends = new Set(); // Use Set to ensure unique friend connections

//     // Ensure that each user has at least one friend
//     if (randomFriendsCount === 0) {
//       randomFriendsCount = 1;
//     }

//     // Keep generating random friends until the desired count is reached
//     while (randomFriends.size < randomFriendsCount) {
//       const randomFriendIndex = Math.floor(Math.random() * usersArray.length);
//       if (randomFriendIndex !== i) {
//         randomFriends.add(randomFriendIndex);
//       }
//     }

//     // Create a new array to store the friend ObjectIds
//     const friendIds = Array.from(randomFriends).map((index) => usersArray[index]._id);

//     // Assign the friendIds array to the friends property of the user
//     usersArray[i].friends = friendIds;
//   }
//   return usersArray;
// };