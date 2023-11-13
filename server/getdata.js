const app = require('../server/app')

const axios = require('axios');

async function fecthData(){
    try {
        const {data} = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
            headers:{
                'x-rapidapi-key': process.env.XRAPIDAPIKEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: {
                "team": "41",
                "season": "2021",
                "league": "39"
                }
        })
        console.log(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

fecthData();

module.exports = fecthData;