const Bookmark = require("../models/bookmark");
const { connectDB } = require("./init");

const seedDB = async () => {
  await connectDB();
  await Bookmark.sync({ force: true }); // Drop the table if it already exists, and then recreate it.

  await Bookmark.bulkCreate([
    {
      url: "https://example.com",
      title: "Example",
      description: "Example bookmark",
    },
    {
      url: "https://google.com",
      title: "Google",
      description: "Search engine",
    },
  ]);

  console.log("Database seeded");
  process.exit(0); // Exit the process
};

seedDB();
