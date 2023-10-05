import {Router} from "express";
import { getService, addService, deleteService, updateService, getByText, findByName, getServices } from '../controllers/service.controller'
import { addClient, getClients, getClient } from "../controllers/client.controller";
import { addResClient, getResClient, getResId, getResInfo } from "../controllers/reservation.controller";
import { addServiceDetail, getSerDet } from "../controllers/servicedet.controller";

const router = Router()

//Client
router.post('/client/addClient', addClient);

//Reservation
router.post('/reservation/addResClient', addResClient);
router.get('/reservation/getResInfo', getResInfo);

//Service
router.get('/service/getServices', getServices);
router.post('/service/addService', addService);
router.delete('/service/deleteService/:id', deleteService);
router.put('/service/updateService/:id', updateService);

//ServiceDetails
router.post('/serviceDet/addSerDet', addServiceDetail);

export default router