'use strict';
const app = require('../app')
const axios = require('axios');
const sleep = require('../helper/sleep');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let result = [];
    let total = 53;
    let count = 1;

    for (let i = 33; i < total; i++) {
      if (count % 10 === 0) {
        await sleep(60000)
      }

      const { data } = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
        headers: {
          'x-rapidapi-key': process.env.XRAPIDAPIKEY,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        params: {
          "team": String(i),
          "season": "2021",
          "league": "39"
        }
      })

      let defaultTeam = {
        "name": data.response.team.name,
        "logo": data.response.team.logo,
        "win": data.response.fixtures.wins.total,
        "draw": data.response.fixtures.draws.total,
        "lose": data.response.fixtures.loses.total,
        "goal_average": Number(data.response.goals.for.average.total),
        "clean_sheet": data.response.clean_sheet.total,
        "failed_to_score": data.response.failed_to_score.total,
        "authorId": 1
      }
      if (defaultTeam.win !== 0) {
        result.push(defaultTeam)
      } else {
        total++
      }
      count++;
      
    }

    result.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Teams", result)
    

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teams", null, {
      truncate: true,
      restartIdentity: true
    })
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
