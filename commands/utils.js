// utils to create - update - delete application commands
import { discordRequest } from "../utils.js"

export const createCommands = async (appId, commands) => {
    console.log(commands)
    const createCommandUrl = `/applications/${appId}/commands`
    try {
        const res = await discordRequest(createCommandUrl, {method: 'PUT', body: commands}) 
        const json = await res.json()
        console.log(json)
    } catch (err) {
        console.error(err)
    }
}

export const getAllCommands = async (appId) => {
    const commmandUrl = `/applications/${appId}/commands`
    try {
        const res = await discordRequest(commmandUrl, {method: 'GET'})
        return await res.json()
    } catch(err) {
        console.error(err)
    }
}

export const deleteCommmand = async (appId, commandId) => {
    const deleteCommandUrl = `/applicatoins/${appId}/commands/${commandId}`
    try {
        await discordRequest(deleteCommandUrl, {method: 'DELETE'})
    } catch (err) {
        console.error(err)
    }
}