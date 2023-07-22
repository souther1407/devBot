import config from "./config/index.js";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs/promises";
import path from "path";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Client logged as: ${c.user.tag}`);
});

client.commands = new Collection();
const commandPath = path.join(process.cwd(), "src", "commands");
const commandsFolders = await fs.readdir(commandPath);

for (let folder of commandsFolders) {
  const subfolder = path.join(commandPath, folder);
  const files = await fs.readdir(subfolder);
  for (let file of files) {
    const { default: module } = await import(`./commands/${folder}/${file}`);
    if (module.data && module.execute) {
      client.commands.set(module.data.name, module);
    } else {
      console.log(
        `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(config.token);

export default client;