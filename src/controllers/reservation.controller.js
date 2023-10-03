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

export const getRes = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', req.params.id)
      .execute('GetRes');

    res.json(result.recordset);
    pool.close();
}

export const getResClient = async(req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input('id', req.params.id)
    .execute('GetResCli');

  res.json(result.recordset);
  pool.close();
};

export const getResInfo = async(req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input('id', req.params.id)
    .execute('GetResInfo');

  res.json(result.recordset);
  pool.close();
};