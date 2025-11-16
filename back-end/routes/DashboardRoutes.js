import express from 'express';

import { authMiddleware } from '../middleware/auth.js';

import { userDashboardData,committeUserData,adminData} from '../controller/DashboardController.js';

const dashboardRoutes=express.Router();


dashboardRoutes.get('/userData',authMiddleware,userDashboardData);

dashboardRoutes.get('/commiteeData',authMiddleware,committeUserData);

dashboardRoutes.get('/adminData',adminData);

export default dashboardRoutes;

