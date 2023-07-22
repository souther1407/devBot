export default class WebhookController {
  async postWebhook(req, res) {
    try {
      console.log(req.body);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
