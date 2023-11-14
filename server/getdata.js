const app = require('../server/app')

const axios = require('axios');
const fs = require('fs')

async function fecthData() {
    try {
        let array = [];
        // for (let i = 33; i < 53; i++) {
            const { data } = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
                headers: {
                    'x-rapidapi-key': "53ca37e208c12bb69145b1dc0b721ac9",
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                },
                params: {
                    "team": "33",
                    "season": "2021",
                    "league": "39"
                }
            })
            console.log(data.response)
         
                // let  defaultTeam = {
                //     "name": data.response.team.name,
                //     "logo": data.response.team.logo,
                //     "win": data.response.fixtures.wins.total,
                //     "draw": data.response.fixtures.draws.total,
                //     "lose": data.response.fixtures.loses.total,
                //     "goal_average": Number(data.response.goals.for.average.total),
                //     "clean_sheet": data.response.clean_sheet.total,
                //     "failed_to_score": data.response.failed_to_score.total,
                //     "authorId": 1
                // }
            
                // console.log(defaultTeam.win, "<<<< ini data winnya")   
               
                    //  }
            //    } 
                
               
            
        
        fs.writeFileSync('./datadummy.json', JSON.stringify(array))
    } catch (error) {
        console.log(error)
    }
}
fecthData()
// async function getData() {
//     const { data } = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
//         headers: {
//             'x-rapidapi-key': process.env.XRAPIDAPIKEY,
//             'x-rapidapi-host': 'v3.football.api-sports.io'
//         },
//         params: {
//             "team": "43",
//             "season": "2021",
//             "league": "39"
//         }
//     })

//   let  defaultTeam = {
//         "name": data.response.team.name,
//         "logo": data.response.team.logo,
//         "win": data.response.fixtures.wins.total,
//         "draw": data.response.fixtures.draws.total,
//         "lose": data.response.fixtures.loses.total,
//         "goal_average": Number(data.response.goals.for.average.total),
//         "clean_sheet": data.response.clean_sheet.total,
//         "failed_to_score": data.response.failed_to_score.total,
//         "authorId": 1
//     }

//     console.log(defaultTeam)
// }
// getData()