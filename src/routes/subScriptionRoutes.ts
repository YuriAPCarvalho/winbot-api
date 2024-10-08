import express from 'express';
import isAuth from '../middleware/isAuth';

import * as SubscriptionController from '../controllers/SubscriptionController';

const subscriptionRoutes = express.Router();
subscriptionRoutes.post(
  '/subscription',
  isAuth,
  SubscriptionController.createSubscription
);
subscriptionRoutes.post(
  '/cardsubscription',
  SubscriptionController.createCardSubscriptionPlan
);

subscriptionRoutes.post(
  '/cardunsubscription',
  isAuth,
  SubscriptionController.cardUnsubscription
);

subscriptionRoutes.post(
  '/upgradeSubscription',
  SubscriptionController.upgradeSubscription
);

subscriptionRoutes.post(
  '/subscription/create/webhook',
  SubscriptionController.createWebhook
);
subscriptionRoutes.post(
  '/subscription/webhook/:type?',
  SubscriptionController.webhook
);

export default subscriptionRoutes;
