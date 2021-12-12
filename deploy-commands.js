///////////////////////////////////////////////////////////////////////////////
// MODULES
///////////////////////////////////////////////////////////////////////////////

const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./config.json");

///////////////////////////////////////////////////////////////////////////////
// PROPERTIES
///////////////////////////////////////////////////////////////////////////////

const commands =
[
	new SlashCommandBuilder().setName("esp").setDescription("English -> Esperanto")
		.addStringOption(option => option.setName("string").setDescription("The string to translate.").setRequired(true)),
		new SlashCommandBuilder().setName("eng").setDescription("Esperanto -> English")
		.addStringOption(option => option.setName("string").setDescription("The string to translate.").setRequired(true))
];

const rest = new REST().setToken(config.token);

///////////////////////////////////////////////////////////////////////////////
// EXECUTE
///////////////////////////////////////////////////////////////////////////////

commands.map(command => command.toJSON());

rest.put(Routes.applicationCommands(config.clientId), { body: commands })
	.then(() => console.log("Deployed Traduki commands."))
	.catch(console.error);