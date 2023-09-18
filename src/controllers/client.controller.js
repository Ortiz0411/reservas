import {getConnection, sql} from '../database/connection'

export const addClient = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('name', req.body.name)
    .input('lastname', req.body.lastname)
    .input('email', req.body.email)
    .input('tel', req.body.tel)
    .execute('AddClient');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

export const getClients = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('GetClients');
    console.log(resul);   
    res.json(resul.recordset);
    pool.close();
};

export const getClient = async(req, res) => {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('text', req.params.text)
      .execute('GetClient');

    res.json(result.recordset);
    pool.close();
};