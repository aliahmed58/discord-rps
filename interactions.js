import 'dotenv/config'
import { json, Router } from "express";
import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from "discord-interactions";
import { getHtmlResults } from './scraping/scraper.js';
import { BASE_URL } from './constants.js';
import { discordRequest } from './utils.js';

const router = Router()

const activeGames = {}

router.get('/', (req, res) => {
    res.status(200).json({works: true})
})

router.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
    const { type, id, data, token } = req.body

    if (type == InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG })
    }

    if (type == InteractionType.APPLICATION_COMMAND) {
        const { name } = data

        if (name === 'search') {
            const searchQuery = data.options[0].value

            try {
                const body = {
                    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
                }
                const url = `/interactions/${id}/${token}/callback`
                const res = await discordRequest(url, {method: 'POST', body: body})
            } catch(err) {
                console.log(err)
            }

            const results = await getHtmlResults(searchQuery)
            console.log(JSON.stringify(results).length)

            let jsonContent = JSON.stringify(results, null, " ")

            try {
                const body = {
                    content: results
                }
                const url = `/webhooks/${process.env.APP_ID}/${token}/messages/@original`
                const res = await discordRequest(url, {method: 'PATCH', body: body})
            } catch (err) {
                console.log(err)
            }

            return res.status(200) 
            
        }

        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });
    }
})

export default router;
