'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Team, {foreignKey: "authorId"})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull:{
          msg: "Email is required"
        },
        isEmail: {
          msg: "must be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull:{
          msg: "Password is required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "visitor"
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((el) => {
    el.password = hashPassword(el.password)
  })

  return User;
};