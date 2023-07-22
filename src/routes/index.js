import webhookRouter from "./webhook.routes.js";

export default (app) => {
  app.use("/webhook", webhookRouter);
};
