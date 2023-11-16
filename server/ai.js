const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI });

async function main() {
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
        stream: true
    });
    
    let str = "";
    for await (const chunk of completion) {
        console.log(chunk.choices[0].delta.content);
        // str += chunk.choices[0].delta.content
    }
    // console.log(str)
}
main();