import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("factorial")
    .setDescription("Calcula el factorial de un numero natural")
    .addIntegerOption((option) =>
      option
        .setName("num")
        .setDescription("el numero a calcular")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const factorial = interaction.options.getInteger("num");
    if (factorial < 0)
      return await interaction.editReply(`result: incorrect number`);
    if (factorial === 0) return await interaction.editReply(`result: 1`);
    let result = 1;
    for (let n = 1; n <= factorial; n++) {
      result *= n;
    }
    await interaction.editReply(`result: ${result}`);
  },
};
