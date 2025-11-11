import express from 'express'

import { assignComplaint,getComplaintByUser,getComplaintByAssignedUser,updateComplaintStatusByAssignedUser} from '../controller/AssignedController.js'

import { authMiddleware } from '../middleware/auth.js';

const assignRoutes=express.Router();

assignRoutes.post('/:complaintId/:assignedTo',authMiddleware,assignComplaint);

assignRoutes.get('/getComplaintsByUser',authMiddleware,getComplaintByUser);

assignRoutes.get('/getComplaintsByAssignedUser',authMiddleware,getComplaintByAssignedUser);

assignRoutes.put('/updateStatus/:id',updateComplaintStatusByAssignedUser)



export default assignRoutes;