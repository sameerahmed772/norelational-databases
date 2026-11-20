const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
  await users.insertOne({
    name: "Amélie Martin",
    email: "amelie@example.com",
    address: { city: "Paris", country: "France" },
  });

  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Lucas Bernard",
    email: "lucas@example.com",
    skills: ["JavaScript", "MongoDB", "Node.js"],
  });

  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
    {
      name: "Chloé Dubois",
      email: "chloe@example.com",
      address: { city: "Lyon", country: "France" },
      skills: ["HTML", "CSS"],
    },
    {
      name: "Hugo Petit",
      email: "hugo@example.com",
      address: { city: "Marseille", country: "France" },
      skills: ["Python"],
    },
    {
      name: "Emma Laurent",
      email: "emma@example.com",
      address: { city: "Brussels", country: "Belgium" },
      skills: ["SQL", "Java"],
    },
    {
      name: "Noah Garcia",
      email: "noah@example.com",
      address: { city: "Madrid", country: "Spain" },
    },
    {
      name: "Léa Moreau",
      email: "lea@example.com",
      address: { city: "Geneva", country: "Switzerland" },
    },
  ]);

  // TODO 4: retrieve all documents and log each user's name.
  const allUsers = await users.find().toArray();
  console.log("All users:");
  allUsers.forEach((user) => console.log(user.name));

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log("User in Paris:", parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
  const frenchUsers = await users.find({ "address.country": "France" }).toArray();
  console.log("Users from France:");
  frenchUsers.forEach((user) => console.log(user.name));

  // TODO 7: find all users who have a skills field and log their names.
  const usersWithSkills = await users.find({ skills: { $exists: true } }).toArray();
  console.log("Users with skills:");
  usersWithSkills.forEach((user) => console.log(user.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
