'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });
    Post.hasMany(models.Favorite, {
     foreignKey: "postId",
     as: "favorites"
    });
    // afterCreate: Sequelize "hook." Hooks are like event listeners that wait for a certain event to happen
    //and fire any requests we have queued for that particular event.
    Post.afterCreate((post, callback) => {
      return models.Favorite.create({
        userId: post.userId,
        postId: post.id
      });
    });
    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };
  Post.prototype.isOwner=function(){
    return this.userId === this.foreignKey;
  }
  Post.prototype.getPoints = function(){
   if(this.votes.length === 0) return 0//Check if the post has any votes
   return this.votes//If a post has votes, then we get a count of all values. This is an array of Vote objects.
     .map((v) => { return v.value })//Transforms the array this.votes Vote objects>>values
     .reduce((prev, next) => { return prev + next });//Goes over all values, reducing them until one is left which is the total
  };
  Post.prototype.getFavoriteFor = function(userId){
    return this.favorites.find((favorite) => { return favorite.userId == userId });
  };
  return Post;
};
