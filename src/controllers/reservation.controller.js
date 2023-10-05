import {getConnection, sql} from '../database/connection'

export const addResClient = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pDate', req.body.pDate)
    .execute('pa_AddResClient');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

export const getResInfo = async(req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .execute('pa_GetResInfo');

  res.json(result.recordset);
  pool.close();
};