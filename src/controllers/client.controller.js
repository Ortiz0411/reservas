import {getConnection, sql} from '../database/connection'

export const addClient = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pLastname', req.body.pLastname)
    .input('pEmail', req.body.pEmail)
    .input('pTel', req.body.pTel)
    .execute('pa_AddClient');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};