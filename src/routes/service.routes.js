import {Router} from "express";
import { getService, addService, deleteService, updateService, getByText, findByName } from '../controllers/service.controller'

const router = Router()

router.get('/service/getServices', getService)

router.get('/service/findByName/:text', findByName)

router.post('/service/addService', addService)

router.delete('/service/deleteService/:id', deleteService)

router.put('/service/updateService/:id', updateService)

export default router