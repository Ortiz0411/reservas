import {getConnection, sql} from '../database/connection'

export const addServiceDetail = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pReservation', req.body.pReservation)
    .input('pService', req.body.pService)
    .input('pTime', req.body.pTime)
    .input('pPax', req.body.pPax)
    .execute('pa_AddServiceDet');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

