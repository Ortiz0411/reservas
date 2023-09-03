import {Router} from "express";
import { getService, postService, deleteService, updateService } from '../controllers/service.controller'

const router = Router()

router.get('/service/getServices', getService)

router.post('/service/postService', postService)

router.delete('/service/deleteservice', deleteService)

router.put('/service/updateService', updateService)

export default router