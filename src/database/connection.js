import sql from 'mssql'

const dbSettings = {
    user: 'ortiz',
    password: 'limon',
    server: 'localhost',
    database: "reservations",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export {sql};