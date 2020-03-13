
const { TABLES } = require("../config/constants");
module.exports = {
    INSERT: async (con, table, data) => {
        let { email, name, salary } = data;
        let sql = `
                INSERT INTO 
                    ${table}
                    (name,email,salary)
                VALUES
                    ('${name}','${email}','${salary}')    
                `;

        return await con.query(sql);

    },
    userDetail: async (con, data) => {
        let query = `   
        select 
            * 
        from 
           ${TABLES.USER} u
        WHERE 
            1=1    
    `;
        if (data.salary != "" && data.sign == "") {
            query += ` AND u.salary = '${data.salary}'`;
        }
        if (data.salary != "" && data.sign != "") {
            query += ` AND u.salary ${data.sign} '${data.salary}'`;
        }



        return await con.query(query)

    },

}