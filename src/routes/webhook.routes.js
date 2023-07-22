import { Router } from "express";
import WebhookController from "../controllers/webhook.controller.js";
const router = Router();
const controller = new WebhookController();
router.post("/push", controller.postPushWebhook);
router.post("/pr", controller.postPRWebhook);
export default router;
