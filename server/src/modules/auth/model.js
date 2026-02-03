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