const OpenAI = require("openai");
class OpenAi {

    static async streamAi(req, res, next) {

        
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Acces-Control-Allow-Origin', '*')
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI });


        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": "You are a helpful assistant." },
            {
                "role": "user", "content": `
        \`\`\`json
        {
                "name": "Manchester United",
                "logo": "https://media-4.api-sports.io/football/teams/33.png",
                "win": 16,
                "draw": 10,
                "lose": 12,
                "goal_average": 1.5,
                "clean_sheet": 8,
                "failed_to_score": 9,
                "authorId": 1
            }\`\`\`
        based on the above data give your opinion what should "Manchester United" do to do better in next season
        `}
            ],
            model: "gpt-3.5-turbo",
            stream: true,
        }
        );
        // const intervalId = setInterval(() => {
        //     const date = new Date().toLocaleString()
        //     res.write(`data: ${date}\n\n`)
        // }, 1000)
        
        
        for await (const chunk of completion) {
            // res.write((chunk.choices[0].delta.content));
            
            res.write(chunk.choices[0].delta.content.toLocaleString())
        }
        
        
    }
}

module.exports = OpenAi;