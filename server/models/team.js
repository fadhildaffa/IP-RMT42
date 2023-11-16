'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {foreignKey: "authorId"})
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    win: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Win is required"
        },
        notNull: {
          msg: "Win is required"
        },
        isNumeric:{
          msg: "Win must be a number"
        },
        min: 0
      }
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Draw is required"
        },
        notNull: {
          msg: "Draw is required"
        },
        isNumeric:{
          msg: "Draw must be a number"
        },
        min: 0
      }
    },
    lose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Lose is required"
        },
        notNull: {
          msg: "Lose is required"
        },
        isNumeric:{
          msg: "Lose must be a number"
        },
        min: 0
      }
    },
    logo: DataTypes.STRING,
    clean_sheet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Clean Sheet is required"
        },
        notNull: {
          msg: "Clean Sheet is required"
        },
        isNumeric:{
          msg: "Clean Sheet must be a number"
        },
        min: 0
      }
    },
    goal_average: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Average Goal is required"
        },
        notNull: {
          msg: "Average Goal is required"
        },
        isNumeric:{
          msg: "Average Goal must be a number"
        },
        min: 0
      }
    },
    failed_to_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Fail to Score is required"
        },
        notNull: {
          msg: "Fail to Score is required"
        },
        isNumeric:{
          msg: "Fail to Score must be a number"
        },
        min: 0
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author Id is required"
        },
        notNull: {
          msg: "Author Id is required"
        },
        isNumeric:{
          msg: "Author Id must be a number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};