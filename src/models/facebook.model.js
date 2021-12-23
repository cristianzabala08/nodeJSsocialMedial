const sql = require("./db");

const getAll = (result) => {
    sql.query("select * from users", (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
    
        result(null, res);
      });
};

const findById = (customerId, result) => {
    sql.query(`SELECT * FROM users WHERE users_id = ${customerId}`, (err, res) => {
      if (err) {
       
        result(err, null);
        return;
      }
  
      if (res.length) {
       
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  

module.exports = {
    getAll,
    findById
};