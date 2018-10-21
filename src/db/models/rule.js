'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",//refer to create-topic.js. Table name is Topics.
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic, {
       foreignKey: "topicId",
       onDelete: "CASCADE",
     });
  };
  return Rule;
};
