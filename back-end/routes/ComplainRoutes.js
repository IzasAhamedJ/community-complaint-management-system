import express from 'express';
import { createComplaints,getComplaints,deleteComplaint} from '../controller/ComplaintController.js';
import { upload } from '../middleware/upload.js';
import { authMiddleware } from '../middleware/auth.js';


const complaintsRoutes=express.Router();

complaintsRoutes.post('/createComplaint',authMiddleware,upload.single("image"),createComplaints);

complaintsRoutes.get('/getComplaints',authMiddleware,getComplaints);

complaintsRoutes.delete('/removeComplaint/:id',deleteComplaint)

export default complaintsRoutes;