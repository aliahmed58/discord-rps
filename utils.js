import 'dotenv/config'
import {BASE_URL} from './constants.js'

export const discordRequest = async (endpoint, options) => {
    const completeUrl = `${BASE_URL}/${endpoint}`

    if (options.body) options.body = JSON.stringify(options.body);

    const res = await fetch(completeUrl, {
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',     
        },
        ...options
    })

    if (!res.ok) {
        const data = await res.json()
        console.log(res.status)
        throw new Error(JSON.stringify(data))
    }

    return res;
}