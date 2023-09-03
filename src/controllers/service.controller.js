import e from 'express';
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
    .output('resultMessage', sql.VarChar(100))
    .query('exec AddService @name, @category, @description, @rackPrice, @netPrice, @tax, @resultMessage');

    const resultMessage = result.output.resultMessage;
    res.json(resultMessage);
    pool.close();
};