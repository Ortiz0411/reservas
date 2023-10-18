import {getConnection, sql} from '../database/connection'

export const login = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pPass', req.body.pPass)
    .execute('pa_Login');

    const resultMessage = result.recordset[0].Message;
    res.json( {message: resultMessage});
    pool.close();
};