import { SlashCommandBuilder } from "discord.js";
const MEME_API = "https://meme-api.com/gimme";
export default {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("muestra un meme random :D"),
  async execute(interaction) {
    await interaction.deferReply();
    const response = await fetch(MEME_API);
    const { url } = await response.json();
    await interaction.editReply(url);
  },
};
