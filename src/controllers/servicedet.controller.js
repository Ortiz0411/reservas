import {getConnection, sql} from '../database/connection'

export const addServiceDetail = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', req.body.id)
    .input('time', req.body.time)
    .input('pax', req.body.pax)
    .execute('AddSerDetails');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

export const getSerDet = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', req.params.id)
      .execute('GetSerDet');

    res.json(result.recordset);
    pool.close();
}