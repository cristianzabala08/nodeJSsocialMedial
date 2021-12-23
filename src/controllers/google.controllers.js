const { getAll, findById } = require('../models/google.model');
const passport = require('passport');

getGoogle = async (req, res) => {

    getAll((err, data) => {

        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);

    });

    /* try {
     mysqlConnection.query('select * from actor',(err, rows, fields)=>{
            if(!err) {
                res.json(rows);
              } 
        }); 

    } catch (error) {
        if (error.code && error.code === 11000) {
            res
              .status(400)
              .send({ status: "DUPLICATED_VALUES", message: error.keyValue });
            return;
          }
          res.status(500).send({ status: "ERROR", message: error.message });
    } */
};


getGoogleById = async (req, res) => {


    findById(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    });

};

googleAuth = [
    passport.authenticate("google", { scope: ["email","profile"] })
];

googleCallBack = [
    passport.authenticate("google", {
        failureRedirect: "/login?login_failed",
      }),
      function (req, res) {
        res.redirect("/google");
      },
];


module.exports = {
    getGoogle,
    getGoogleById,
    googleAuth,
    googleCallBack
};