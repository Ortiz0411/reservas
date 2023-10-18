import {getConnection, sql} from '../database/connection'

export const login = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('pName', req.body.pName)
    .input('pPass', req.body.pPass)
    .execute('pa_Login');

    const resultMessage = result.recordset[0].Message;
    res.json( {message: resultMessage});
    pool.close();
};

export const changePassword = async (req, res) => {

    const { pId } = req.params;
    const pool = await getConnection();

    const {
        pPass
    } = req.body;

    const result = await pool
    .request()
    .input('pId', pId)
    .input('pPass', pPass)
    .execute('pa_ChangePassword');

    const resultMessage = result.recordset[0].Msg;
    res.json( {message: resultMessage});
    pool.close();

};