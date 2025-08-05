const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../db/init");
const Bookmark = require("../models/bookmark");

beforeAll(async () => {
  await sequelize.sync({ force: true });
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
});

afterAll(async () => {
  await sequelize.close();
});

describe("Bookmarkly App API Tests", () => {
  it("should get all bookmarks", async () => {
    const res = await request(app).get("/bookmarks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it("should create a new bookmark", async () => {
    const res = await request(app).post("/bookmarks").send({
      url: "https://github.com",
      title: "Github",
      description: "Code repository",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.url).toBe("https://github.com");
  });

  it("should update a bookmark as favorite", async () => {
    const res = await request(app)
      .patch("/bookmarks/1")
      .send({ favorite: true });

    expect(res.statusCode).toEqual(200);
    expect(res.body.favorite).toBe(true);
  });

  it("should delete a bookmark", async () => {
    const res = await request(app).delete("/bookmarks/2");
    expect(res.statusCode).toEqual(204);
  });
});
