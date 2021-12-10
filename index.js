///////////////////////////////////////////////////////////////////////////////
// MODULES
///////////////////////////////////////////////////////////////////////////////

const { Client, Intents, InteractionCollector } = require("discord.js");
const config = require("./config.json");

///////////////////////////////////////////////////////////////////////////////
// PROPERTIES
///////////////////////////////////////////////////////////////////////////////

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

///////////////////////////////////////////////////////////////////////////////
// EXECUTE
///////////////////////////////////////////////////////////////////////////////

client.on("ready", () => console.log("Started Traduki."))

client.on("interactionCreate", interaction =>
{
    if (interaction.isCommand())
    {
        const { commandName } = interaction;
        if (commandName === "ping")
        {
            interaction.reply("pong");
        }
    }
});

client.login(config.token);