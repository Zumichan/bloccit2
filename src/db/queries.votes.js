const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Vote = require("./models").Vote;

module.exports = {
 createVote(req, val, callback){
   return Vote.findOne({
     where: {
       postId: req.params.postId,
       userId: req.user.id
     }
   })
   .then((vote) => {
     if(vote){//if we find a vote
       vote.value = val;//Update the vote's value to the new upvote or downvote value
       vote.save()//save the change
       .then((vote) => {
         callback(null, vote);
       })
       .catch((err) => {
         callback(err);
       });
     } else {//if we don't find a vote, create a new vote (user can still create a vote for this post)
       Vote.create({
         value: val,
         postId: req.params.postId,
         userId: req.user.id
       }).then((vote) => {
         callback(null, vote);
       })
       .catch((err) => {
         callback(err);
       });
     }
   });
 }
}
