import express from 'express'
import { upload } from '../middleware/upload.js';


import { createNews,getNews,deleteNews} from '../controller/CurrentNews.js'

const newsRoutes=express.Router();

newsRoutes.post('/createNews',upload.single("image"),createNews);

newsRoutes.get('/getNews',getNews);

newsRoutes.delete('/deleteAnnouncement/:id',deleteNews)

export default newsRoutes;