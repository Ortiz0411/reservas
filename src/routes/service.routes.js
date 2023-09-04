import {Router} from "express";
import { getService, addService, deleteService, updateService } from '../controllers/service.controller'

const router = Router()

router.get('/service/getServices', getService)

router.post('/service/addService', addService)

router.delete('/service/deleteService/:id', deleteService)

router.put('/service/updateService/:id', updateService)

export default router