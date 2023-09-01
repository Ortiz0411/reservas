import {getConnection, sql} from '../database/connection'

export const getService = async (req, res) => {
    
    const pool = await getConnection();
    const resul = await pool.request().execute('GetServices');
    
    console.log(resul);   
    res.json(resul.recordset);
};

export const postService = async (req, res) => {

    const { name, category, description, rackPrice, netPrice, tax} = req.body;
    const pool = await getConnection();

    const resul = await pool.request()
    .input('name', sql.VarChar, name)
    .input('category', sql.VarChar, category)
    .input('description', sql.VarChar, description)
    .input('rackPrice', sql.Float, rackPrice)
    .input('netPrice', sql.Float, netPrice)
    .input('tax', sql.Int, tax)
    .execute('PostService @name @category @description @rackPrice @netPrice @tax');
    return postService.recordset;
};

export const deleteService = async (req, res) => {
    
    const id = req.params.id;
    
    const pool = await getConnection();
    const request = pool.request();
    request.input('id', sql.Int, id);
    request.output('msg', sql.VarChar(50));

    await request.execute('DeleteService @id');

    const msg = request.parameters.msg.value;

    res.json({msg});

};