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
    }
  }
  Team.init({
    name: DataTypes.STRING,
    win: DataTypes.INTEGER,
    draw: DataTypes.INTEGER,
    lose: DataTypes.INTEGER,
    logo: DataTypes.STRING,
    clean_sheet: DataTypes.INTEGER,
    goal_average: DataTypes.INTEGER,
    failed_to_score: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};