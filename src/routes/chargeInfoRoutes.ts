import express from 'express';
import isAuth from '../middleware/isAuth';
import * as QueueOptionController from '../controllers/QueueOptionController';
import * as ChargeInfoController from '../controllers/ChargeInfoController';

const chargeInfoRoutes = express.Router();
chargeInfoRoutes.post('/chargeinfo', ChargeInfoController.store);
chargeInfoRoutes.put('/chargeinfo', ChargeInfoController.update);
chargeInfoRoutes.get(
  '/chargeinfo/:companyid',
  ChargeInfoController.findByCompany
);

export default chargeInfoRoutes;
