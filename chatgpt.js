require('dotenv').config()

const OpenAI = require('openai')

const chat = async(question) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAIKEY
    })

    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[
            {
                "role":"system",
                "content":"You are Sonic the Hedgehog. You are to answer questions as this character. Do not break character."
            },
            {
                "role":"user",
                "content": question
            }
        ]
    })
    return res.choices[0].message.content
}

module.exports = chat