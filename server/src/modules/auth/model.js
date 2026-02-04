import db from "../../../src/config/dbconfig.js";

export const findUserByUsername = async (id) =>{
    const query = `select users.id,users.role_id,users.username,users.password_hash AS password, system_roles.role_name from users  INNER JOIN system_roles ON users.role_id=system_roles.id where username=? AND is_active=1`;
    const [rows] = await db.query(query,[id]);
    return rows;
}

export const updateRefreshToken = async (token,id) => {
    const query = `UPDATE users SET refresh_token = ? WHERE id = ?`;
    const [rows] = await db.query(query,[token,id]);
    return rows;
}

export const findUserByRefreshToken = async (token) => {
    const query = `SELECT users.id, users.username, users.role_id, system_roles.role_name 
        FROM users 
        INNER JOIN system_roles ON users.role_id = system_roles.id
        WHERE refresh_token = ?`;
    const [rows] = await db.query(query,[token]);
    return rows;
}

export const userLogoutQuery = async (token) => {
    const query = `UPDATE users SET refresh_token = NULL WHERE refresh_token = ?`;
    const [rows] = await db.query(query,[token]);
    return rows;
}