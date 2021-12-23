const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mysqlConnection = mysql.createConnection({
    host: process.env.host,
    user : process.env.user,
    password: process.env.password,
    database : process.env.database,
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err) {
         console.log('Connected');
    }else{
        console.log('Connection Failed');
    }
});


module.exports = mysqlConnection;