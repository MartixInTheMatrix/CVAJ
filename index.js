const { Client, Intents, Collection } = require('discord.js')
const config = require('./util/config')
const client = new Client({intents:config.INTENTS})

client.login(config.token)
client.commands = new Collection()

const { loadEvents, loadCommands } = require('./startup')
require("./util/functions")(client);
const db = require('./util/db')

loadEvents(client)
db.init()

/**
 * Dev by martix
 */