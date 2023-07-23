import config from "./config/index.js";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs/promises";
import path from "path";

class DevBot {
  static instance = new DevBot();

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
  }
  async init() {
    this.client.commands = new Collection();
    const commandPath = path.join(process.cwd(), "src", "commands");
    const commandsFolders = await fs.readdir(commandPath);

    for (let folder of commandsFolders) {
      const subfolder = path.join(commandPath, folder);
      const files = await fs.readdir(subfolder);
      for (let file of files) {
        const { default: module } = await import(
          `./commands/${folder}/${file}`
        );
        if (module.data && module.execute) {
          this.client.commands.set(module.data.name, module);
        } else {
          console.log(
            `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
    this.initEvents();
    await this.client.login(config.token);
  }
  initEvents() {
    this.client.once(Events.ClientReady, (c) => {
      console.log(`Client logged as: ${c.user.tag}`);
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
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
  }
  publishMessage(message) {
    const channel = this.client.channels.cache.get(config.channelId);
    channel?.send(message);
  }
}
await DevBot.instance.init();

export default DevBot;
