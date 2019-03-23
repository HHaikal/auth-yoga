'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
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


  // assosication
  user.associate = function (models) {
    // associations can be defined here
  };



  user.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  })

  user.findByLogin = async login => {
    let crendentials = await user.findOne({
      where: { email: login },
    });

    return crendentials;
  };

  user.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  user.prototype.validatePassword = async function (password) {
    console.log(password);

    return await bcrypt.compare(password, this.password)
  }

  return user;
};