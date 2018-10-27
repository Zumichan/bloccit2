const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
    });
  });

  describe("#create()", () => {
    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "The rise of web development",
        description: "Web development keeps on changing",
      })
      .then((topic) => {
         expect(topic.title).toBe("The rise of web development");
         expect(topic.description).toBe("Web development keeps on changing");
         done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or description", (done) => {
      Topic.create({
        title: "Web Development without description"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });

  describe("#getPosts()", () => {
    it("should create and associate a post with the topic", (done) => {
      Post.create({
        title: "Post Test",
        body: "Test for creating a post",
        topicId: this.topic.id
      })
      .then((newPost) => {
        expect(newPost.topicId).toBe(this.topic.id);
        done();
      })
      .catch((err) => {
         console.log(err);
         done();
      })
    });

    it("should return an array of post objects that are associated with the topic", (done) => {
      this.topic.getPosts()
      .then((arr) => {
        expect(arr[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })

    it("should confirm that the associated post is returned when that method is called", (done) => {
      this.topic.getPosts()
      .then((arr) => {
        expect(arr[0].title).toBe("My first visit to Proxima Centauri b");
        expect(arr[0].body).toBe("I saw some rocks.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  });

});
