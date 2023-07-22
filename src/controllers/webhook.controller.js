import DevBot from "../bot.js";
export default class WebhookController {
  async postWebhook(req, res) {
    try {
      console.log(req.body);
      const msg = `${req.body.pusher.name} hizo un push al repo ${req.body.repository.name}
      ${req.body.head_commit.message}
      time: ${req.body.head_commit.timestamp}
      url: ${req.body.head_commit.url}
      `;
      DevBot.instance.publishMessage(msg);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
}
