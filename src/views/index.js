const facebookRouter = require("./routers/fabook.routers");
const googleRouter = require('./routers/google.routers');
const smsRouter = require('./routers/sms.routers');
const router = (app) => {
  app.use("/auth", facebookRouter);
  app.use("/google", googleRouter);
  app.use("/sms", smsRouter); 
  app.get('/login?login_failed',(res,req)=>{
    res.send("error");
  });
  app.get('/logout', function(req, res){
    req.logout();
    res.send('/auth');
  });
  
};

module.exports = router;