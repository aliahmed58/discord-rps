import express from "express";
import 'dotenv/config'
import { ALL_COMMANDS } from "./commands/commands.js";
import { createCommands } from "./commands/utils.js";

const app = express()

const PORT = process.env.PORT || 3000

const run = () => {
    const helpString = 'USAGE:\n\tnode app.js <option>\nOPTIONS:\n\tserver\t\truns the bot server\n\tcommands\tregisters the commands on the app' 
    if (process.argv.length <= 2) {
        console.log(helpString)
        return
    }

    const runServer = () => {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`)
        })
    }

    const installCommands = () => {
        const data = createCommands(process.env.APP_ID, ALL_COMMANDS)
        console.log(data)
    }
    
    switch (process.argv[2].toLowerCase()) {
        case 'server':
            runServer()
            break;
        case 'commands':
            installCommands() 
            break
        default:
            console.log(helpString)
    }
}

run()
