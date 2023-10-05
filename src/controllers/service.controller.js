import {getConnection, sql} from '../database/connection'


export const getServices = async (req, res) => {
    const pool = await getConnection();
    const resul = await pool.request().execute('pa_GetServices');
    console.log(resul);   
    res.json(resul.recordset);
    pool.close();
};

export const addService = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pCategory', req.body.pCategory)
    .input('pDescription', req.body.pDescription)
    .input('pRackPrice', req.body.pRackPrice)
    .input('pNetPrice', req.body.pNetPrice)
    .input('pTax', req.body.pTax)
    .execute('pa_AddService');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};


export const deleteService = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input('pId', req.params.pId)
    .execute('pa_DeleteService');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};


export const updateService = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    const {
      pName,
      pCategory,
      pDescription,
      pRackPrice,
      pNetPrice,
      pTax
    } = req.body;

    const result = await pool
      .request()
      .input('pId', id)
      .input('pName', pName)
      .input('pCategory', pCategory)
      .input('pDescription', pDescription)
      .input('pRackPrice', pRackPrice)
      .input('pNetPrice', pNetPrice)
      .input('pTax', pTax)
      .execute('pa_UpdateService');

    const resultMessage = result.recordset[0].Msg;

    res.json({ message: resultMessage });

};