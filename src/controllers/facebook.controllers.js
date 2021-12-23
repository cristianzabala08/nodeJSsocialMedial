const { getAll, findById } = require('../models/facebook.model');
const passport = require('passport');


/* passport.use(new FacebookStrategy({
    clientID: process.env.client_id_ip,
    clientSecret: process.env.client_secret_fb,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
     User.findOrCreate({facebookId: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    }); 
    console.log(profile);
    return done(null,profile);
  }
)); */




getFacebook = async (req, res) => {
    try {

        getAll((err, data) => {

            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving customers."
                });
            else res.send(data);

        });

    } catch (error) {
        if (error.code && error.code === 11000) {
            res
                .status(400)
                .send({ status: "DUPLICATED_VALUES", message: error.keyValue });
            return;
        }
        res.status(500).send({ status: "ERROR", message: error.message });
    }
};



getFacebookId = async (req, res) => {


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
        } else {
            res.send(data);
        };
    });

};

const facebookCallBack = async (req, res, next) => {

    passport.authenticate('facebook', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/auth/profile' );
        });
      })(req, res, next);

};

/* const facebookCallBack = [
    passport.authenticate("facebook", {
        failureRedirect: "/login?login_failed",
    }),
    function (req, res) {
        res.redirect("/auth/profile");
    },
]; */

const facebook = [
    passport.authenticate('facebook')
];



module.exports = {
    getFacebook,
    getFacebookId,
    facebook,
    facebookCallBack,
};