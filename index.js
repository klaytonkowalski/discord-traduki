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
        if (commandName === "esp")
        {
            const string = interaction.options.getString("string");
            const [translation] = await translate.translate(string, "eo");
            await interaction.reply(translation);
        }
        else if (commandName === "eng")
        {
            const string = interaction.options.getString("string");
            const [translation] = await translate.translate(string, "en");
            await interaction.reply(translation);
        }
    }
});

client.login(config.token);