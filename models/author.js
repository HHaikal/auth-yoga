'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    // associations can be defined here
  };
  return author;
};