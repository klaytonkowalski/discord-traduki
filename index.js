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
        console.log(`Received command \"${commandName}\".`);
        if (commandName === "esp")
        {
            const string = interaction.options.getString("string");
            const private = interaction.options.getBoolean("private");
            console.log(`Translating string \"${string}\" from English to Esperanto...`);
            const [translation] = await translate.translate(string, "eo");
            await interaction.reply({ content: translation, ephemeral: private });
            console.log(`Replied ${private ? "privately" : "publicly"} with \"${translation}\".`);
        }
        else if (commandName === "eng")
        {
            const string = interaction.options.getString("string");
            const private = interaction.options.getBoolean("private");
            console.log(`Translating string \"${string}\" from Esperanto to English...`);
            const [translation] = await translate.translate(string, "en");
            await interaction.reply({ content: translation, ephemeral: private });
            console.log(`Replied ${private ? "privately" : "publicly"} with \"${translation}\".`);
        }
    }
});

client.login(config.token);