const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("panel")
      .setDescription("Sends the panel link"),
  
    async execute(interaction, client) {
      const pingembed = new EmbedBuilder()
  
        .setColor("#4484e3")
        .setTitle(":ping_pong:  Panel")
        .setDescription("Click the button below to open the panel!")
        .setTimestamp();
  
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Panel")
          .setStyle(5)
          .setEmoji("💻")
          .setURL("https://discordstatus.com/"),
      );
  
      await interaction.reply({
        embeds: [pingembed],
        components: [button],
      });
    },
  };