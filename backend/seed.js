const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

// Load seed data from the JSON files in data/
const usersData = require("./data/users.json");
const postsData = require("./data/posts.json");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  await mongoose.connect(URI);

  await User.deleteMany({});

  await Post.deleteMany({});

  await User.insertMany(usersData);

  await Post.insertMany(postsData);

  const userCount = await User.countDocuments();
  const postCount = await Post.countDocuments();
  console.log(`Seeded ${userCount} users and ${postCount} posts.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
