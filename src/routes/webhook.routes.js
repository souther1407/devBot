import { Router } from "express";
import WebhookController from "../controllers/webhook.controller.js";
const router = Router();
const controller = new WebhookController();
router.post("/", controller.postWebhook);

export default router;
