import {Router} from "express";
import { getService, postService, deleteService } from '../controllers/service.controller'

const router = Router()

router.get('/service/getServices', getService)

router.post('/service/postService', postService)

router.get('/service/service', )

router.put('/service/service', )

export default router