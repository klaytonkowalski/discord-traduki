///////////////////////////////////////////////////////////////////////////////
// MODULES
///////////////////////////////////////////////////////////////////////////////

const { Client, Intents, InteractionCollector } = require("discord.js");
const config = require("./config.json");
const { Translate } = require("@google-cloud/translate").v2;

///////////////////////////////////////////////////////////////////////////////
// PROPERTIES
///////////////////////////////////////////////////////////////////////////////

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const translate = new Translate({ projectId: "discord-traduki" });
const credentials = "/home/klayton/Documents/discord-traduki/credentials.json";

let commandCount = 0;

///////////////////////////////////////////////////////////////////////////////
// EXECUTE
///////////////////////////////////////////////////////////////////////////////

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentials;

client.on("ready", () => console.log("Started Traduki."))

client.on("interactionCreate", async interaction =>
{
    if (interaction.isCommand())
    {
        const { commandName } = interaction;
        console.log(`Received command: \"${commandName}\".`);
        console.log(`Command count: ${++commandCount}.`);
        if (commandName === "esp")
        {
            const string = interaction.options.getString("string");
            const private = interaction.options.getBoolean("private");
            const [translation] = await translate.translate(string, "eo");
            await interaction.reply({ content: translation, ephemeral: private });
        }
        else if (commandName === "eng")
        {
            const string = interaction.options.getString("string");
            const private = interaction.options.getBoolean("private");
            const [translation] = await translate.translate(string, "en");
            await interaction.reply({ content: translation, ephemeral: private });
        }
    }
});

client.login(config.token);
