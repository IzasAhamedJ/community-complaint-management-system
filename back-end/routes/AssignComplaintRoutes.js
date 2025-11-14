import express from 'express'

import { assignComplaint,getComplaintByUser,getComplaintByAssignedUser,updateComplaintStatusByAssignedUser} from '../controller/AssignedController.js'

import { authMiddleware } from '../middleware/auth.js';

const assignRoutes=express.Router();

assignRoutes.post('/:complaintId/:assignedTo',assignComplaint);

assignRoutes.get('/getComplaintsByUser',authMiddleware,getComplaintByUser);

assignRoutes.get('/getComplaintsByAssignedUser',authMiddleware,getComplaintByAssignedUser);

assignRoutes.put('/updateStatus/:id/:status',updateComplaintStatusByAssignedUser)



export default assignRoutes;