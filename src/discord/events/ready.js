const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const config = require("../../../data/config.json");
require("dotenv").config();

module.exports = async (client) => {
  const commandFiles = readdirSync("./src/discord/commands/").filter((file) =>
    file.endsWith(".js"),
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({
    version: "10",
  }).setToken(config.token);

  (async () => {
    try {
        config.guildids.forEach(async ele => {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, ele),
                {
                  body: commands,
                },
            );
        });
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  client.user.setPresence({
     activities: [{ name: `games on dashboard` }],
    status: `dnd`,
  });
};