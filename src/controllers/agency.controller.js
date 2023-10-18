import {getConnection, sql} from '../database/connection'

export const addAgency = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pId', req.body.pId)
    .input('pName', req.body.pName)
    .input('pDir', req.body.pDir)
    .input('pEmail', req.body.pEmail)
    .input('pTel', req.body.pTel)
    .input('pUser', req.body.pUser)
    .execute('pa_AddAgency');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();
};

export const updateAgency = async (req, res) => {
    const { pAgencyId } = req.params;
    const pool = await getConnection();
    const {
        pId,
        pName,
        pDir,
        pEmail,
        pTel
    } = req.body;
    
    const result = await pool
        .request()
        .input('pAgencyId', pAgencyId)
        .input('pId', pId)
        .input('pName', pName)
        .input('pDir', pDir)
        .input('pEmail', pEmail)
        .input('pTel', pTel)
        .execute('pa_UpdateAgency');
    
    const resultMessage = result.recordset[0].Message;
    
    res.json({ message: resultMessage });
    pool.close();
};