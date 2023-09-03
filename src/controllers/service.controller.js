import {getConnection, sql} from '../database/connection'

export const getService = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('GetServices');
    console.log(resul);   
    res.json(resul.recordset);
    pool.close();
};


export const postService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('name', req.body.name)
    .input('category', req.body.category)
    .input('description', req.body.description)
    .input('rackPrice', req.body.rackPrice)
    .input('netPrice', req.body.netPrice)
    .input('tax', req.body.tax)
    .query('exec AddService @name, @category, @description, @rackPrice, @netPrice, @tax');

    const resultMessage = result.recordset[0].Msg;

    res.json( {message: resultMessage});
    pool.close();
};


export const deleteService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('serviceId', req.body.serviceId)
    .query('exec DeleteService @serviceId');

    const resultMessage = result.recordset[0].Msg;

    res.json( {message: resultMessage});
    pool.close();
};


export const updateService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', req.body.id)
    .input('name', req.body.name)
    .input('category', req.body.category)
    .input('description', req.body.description)
    .input('rackPrice', req.body.rackPrice)
    .input('netPrice', req.body.netPrice)
    .input('tax', req.body.tax)
    .query('exec updateService @id, @name, @category, @description, @rackPrice, @netPrice, @tax');

    const resultMessage = result.recordset[0].Msg;

    res.json( {message: resultMessage});
    pool.close();
};