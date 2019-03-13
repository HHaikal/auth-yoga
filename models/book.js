'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, {});
  book.associate = function (models) {
    // associations can be defined here
  };
  return book;
};