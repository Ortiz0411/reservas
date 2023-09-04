import {getConnection, sql} from '../database/connection'


export const getService = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('GetServices');
    console.log(resul);   
    res.json(resul.recordset);
    pool.close();
};


export const addService = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('name', req.body.name)
    .input('category', req.body.category)
    .input('description', req.body.description)
    .input('rackPrice', req.body.rackPrice)
    .input('netPrice', req.body.netPrice)
    .input('tax', req.body.tax)
    .execute('AddService');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};


export const deleteService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('id', req.params.id)
    .execute('DeleteService');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};


export const updateService = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    const {
      name,
      category,
      description,
      rackPrice,
      netPrice,
      tax
    } = req.body;

    const result = await pool
      .request()
      .input('id', id)
      .input('name', name)
      .input('category', category)
      .input('description', description)
      .input('rackPrice', rackPrice)
      .input('netPrice', netPrice)
      .input('tax', tax)
      .execute('UpdateService');

    const resultMessage = result.recordset[0].Msg;

    res.json({ message: resultMessage });

};