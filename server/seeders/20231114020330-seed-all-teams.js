'use strict';
// const app = require('../app')

// const axios = require('axios');

// async function fecthData(){
//     try {
//         const {data} = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
//             headers:{
//                 'x-rapidapi-key': process.env.XRAPIDAPIKEY,
//                 'x-rapidapi-host': 'v3.football.api-sports.io'
//             },
//             params: {
//                 "team": "41",
//                 "season": "2021",
//                 "league": "39"
//                 }
//         })
//         console.log(JSON.stringify(data))
//     } catch (error) {
//         console.log(error)
//     }
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../teams.json');
    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Teams", data)
  //   await queryInterface.bulkInsert("Teams", [{
  //     "name": "Manchester United",
  //     "logo": "https://media-4.api-sports.io/football/teams/33.png",
  //     "win": 16,
  //     "draw": 10,
  //     "lose": 12,
  //     "goal_average": 1.5,
  //     "clean_sheet": 8,
  //     "failed_to_score": 9,
  //     "authodId": 1
  // }])
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

  async down (queryInterface, Sequelize) {
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
