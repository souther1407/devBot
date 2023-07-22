import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Replies the current time"),
  async execute(interaction) {
    await interaction.reply(new Date().toUTCString());
  },
};
