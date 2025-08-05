const Bookmark = require("../models/bookmark");
const { connectDB } = require("./init");

const seedTestDB = async () => {
  await connectDB();
  await Bookmark.sync({ force: true });

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

  console.log("Test database seeded");
  process.exit(0); // Exit the process
};

seedTestDB();
