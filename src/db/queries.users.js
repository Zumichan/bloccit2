const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback){
    //salt-data to pass to hashing function
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
    let result = {};//Object to hold the user, posts, and comments
    User.findById(id)
    .then((user) => {
      if(!user) {
        callback(404);
      } else {
        result["user"] = user;//Store the found user
        Post.scope({method: ["lastFiveFor", id]}).all()//Execute the scope to get the last five posts made by the user
        .then((posts) => {
          result["posts"] = posts;//Store the result in result object
          Comment.scope({method: ["lastFiveFor", id]}).all()//Execute the scope to get the last five comments made by the user
          .then((comments) => {
            result["comments"] = comments;//Store the result in result object
            callback(null, result);//Pass the object to the callback
          })
          .catch((err) => {
            callback(err);
          })
        })
      }
    })
  }

}
