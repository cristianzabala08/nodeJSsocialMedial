const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = function (passport) {
   

    
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
  
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  
    passport.use(
      new FacebookStrategy(
        {
            clientID: process.env.client_id_ip,
            clientSecret: process.env.client_secret_fb,
            callbackURL:  process.env.FACEBOOK_APP_CALLBACK_URL,
        },
        async function(accessToken, refreshToken, profile, done) {
            /*   User.findOrCreate({facebookId: profile.id}, function(err, user) {
                if (err) { return done(err); }
                done(null, user);
              }); */
              console.log(profile);
              return done(null,profile);
            }
       /*  async function (accessToken, refreshToken, profile, cb) {
          const [user, status] = await User.findOrCreate({
            where: {
              social_user_id: profile.id,
              name: profile.displayName,
              registration_type: "facebook",
            },
          });
          cb(null, user);
        } */
      )
    );

    


/*   
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          session: true,
        },
        async function (username, password, done) {
          console.log(`trying to log in as ${username}`);
          const user = await User.findOne({ where: { email: username } });
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(password, user.password, function (err, res) {
            if (res) {
              console.log("successful login");
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      )
    ); */
  
     passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
         
        },
        async function(accessToken, refreshToken, profile, done) {
          /*   User.findOrCreate({facebookId: profile.id}, function(err, user) {
              if (err) { return done(err); }
              done(null, user);
            }); */
            console.log(profile);
            return done(null,profile);
          }
       /*  async function (accessToken, refreshToken, profile, cb) {
          const [user, status] = await User.findOrCreate({
            where: {
              social_user_id: profile.id,
              name: profile.displayName,
              registration_type: "google",
            },
          });
          cb(null, user);
        } */
      )
    ); 

  };