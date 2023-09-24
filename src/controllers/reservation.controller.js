import {getConnection, sql} from '../database/connection'

export const addResClient = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('date', req.body.date)
    .execute('AddResClient');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

