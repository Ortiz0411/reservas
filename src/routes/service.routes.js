import {Router} from "express";
import { getService, addService, deleteService, updateService, getByText, findByName, getServices } from '../controllers/service.controller'
import { addClient, getClients, getClient } from "../controllers/client.controller";
import { addRes, addResClient, addRest, getResClient, getResId, getResInfo } from "../controllers/reservation.controller";
import { addServiceDetail, } from "../controllers/servicedet.controller";
import { addAgency, updateAgency } from "../controllers/agency.controller";
import { addContract, deleteContract, getAllContracts, getContracts } from "../controllers/contract.controller";
import { login } from "../controllers/user.controller";

const router = Router()

//Client
router.post('/client/addClient', addClient);

//User
router.post('/user/login', login);

//Agency
router.post('/agency/addAgency', addAgency);
router.put('/agency/updateAgency/:pAgencyId', updateAgency);

//Contract
router.post('/contract/addContract', addContract);
router.delete('/contract/deleteContract/:pId', deleteContract);
router.get('/contract/getAllContracts', getAllContracts);
router.get('/contract/getContracts/:pAgency', getContracts);

//Reservation
router.post('/reservation/addResClient', addResClient);
router.post('/reservation/addRes', addRes);
router.get('/reservation/getResInfo', getResInfo);

//Service
router.get('/service/getServices', getServices);
router.post('/service/addService', addService);
router.delete('/service/deleteService/:id', deleteService);
router.put('/service/updateService/:id', updateService);

//ServiceDetails
router.post('/serviceDet/addServiceDet', addServiceDetail);

export default router