const axios = require('axios');

async function fecthData(){
    try {
        const {data} = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
            headers:{
                'x-rapidapi-key': '9b1e2789e939acae6c0c1d7ddb87fdfb',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: {
                "team": "33",
                "season": "2021",
                "league": "39"
                }
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

fecthData()
