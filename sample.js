// ------------------------------------------------------------
// Lab 01 - From the terminal to Node.js
// ------------------------------------------------------------
// In session 1 you typed MongoDB commands directly in mongosh:
//
//   db.books.insertOne({ title: "Dune", author: "Frank Herbert" })
//   db.books.find()
//
// Here you will write the exact same operations, but as a Node.js
// script. The MongoDB driver translates your JavaScript calls into
// the same commands mongosh sends to the database.
// ------------------------------------------------------------


const { MongoClient } = require("mongodb");

// MongoDB connection
const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  // Connect to MongoDB
  await client.connect();

  // Select database and collection
  const books = client.db("book_db").collection("books");

  // Start fresh on every run
  await books.deleteMany({});

  // ----------------------------------------------------------
  // TODO 1 - insertOne with an embedded object
  // ----------------------------------------------------------

  await books.insertOne({
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    publisher: {
      name: "Gallimard",
      country: "France"
    }
  });

  // ----------------------------------------------------------
  // TODO 2 - insertOne with an array
  // ----------------------------------------------------------

  await books.insertOne({
    title: "Harry Potter",
    author: "J.K. Rowling",
    tags: ["Fantasy", "Magic", "Adventure"]
  });

  // ----------------------------------------------------------
  // TODO 3 - insertMany
  // ----------------------------------------------------------

  await books.insertMany([
    {
      title: "Dune",
      author: "Frank Herbert",
      publisher: {
        name: "Ace Books",
        country: "USA"
      },
      tags: ["Science Fiction", "Adventure", "Space"]
    },
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      publisher: {
        name: "A. Lacroix",
        country: "France"
      }
    },
    {
      title: "1984",
      author: "George Orwell",
      tags: ["Dystopian", "Political Fiction", "Classic"]
    },
    {
      title: "The Stranger",
      author: "Albert Camus",
      publisher: {
        name: "Gallimard",
        country: "France"
      },
      tags: ["Philosophy", "Classic", "Literature"]
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      tags: ["Fantasy", "Adventure", "Classic"]
    }
  ]);

  // ----------------------------------------------------------
  // TODO 4 - find all documents
  // ----------------------------------------------------------

  const allBooks = await books.find().toArray();

  console.log("\nAll books:");

  allBooks.forEach((book) => {
    console.log(book.title);
  });

  // ----------------------------------------------------------
  // TODO 5 - findOne with dot notation
  // ----------------------------------------------------------

  const frenchBook = await books.findOne({
    "publisher.country": "France"
  });

  console.log("\nFirst French book:", frenchBook?.title);

  // ----------------------------------------------------------
  // TODO 6 - find with a filter
  // ----------------------------------------------------------

  const frenchBooks = await books.find({
    "publisher.country": "France"
  }).toArray();

  console.log("\nNumber of French books:", frenchBooks.length);

  console.log("French books:");

  frenchBooks.forEach((book) => {
    console.log(book.title);
  });

  // ----------------------------------------------------------
  // TODO 7 - find with $exists
  // ----------------------------------------------------------

  const taggedBooks = await books.find({
    tags: { $exists: true }
  }).toArray();

  console.log("\nBooks with tags:");

  taggedBooks.forEach((book) => {
    console.log(book.title, book.tags);
  });

  // Close MongoDB connection
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
