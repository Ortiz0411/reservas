import {Router} from "express";
import { getService, addService, deleteService, updateService, getByText, findByName } from '../controllers/service.controller'
import { addClient, getClients, getClient } from "../controllers/client.controller";
import { addResClient, getResClient } from "../controllers/reservation.controller";
import { addServiceDetail, getSerDet } from "../controllers/servicedet.controller";

const router = Router()

//Client
router.post('/client/addClient', addClient);
router.get('/client/getClients', getClients);
router.get('/client/getClient/:text', getClient);
router.get('/client/getClient/:text', getClient);

//Reservation
router.post('/reservation/addResClient', addResClient);
router.get('/reservation/getResCli/:id', getResClient);

//Service
router.get('/service/getServices', getService);
router.get('/service/findByName/:text', findByName);
router.post('/service/addService', addService);
router.delete('/service/deleteService/:id', deleteService);
router.put('/service/updateService/:id', updateService);

//ServiceDetails
router.post('/serviceDet/addSerDet', addServiceDetail);
router.get('/serviceDet/getSerDet/:id', getSerDet);

export default router