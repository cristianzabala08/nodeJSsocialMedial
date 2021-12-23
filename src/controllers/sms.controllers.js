 getSms = async (req,res) =>{
    try {
        res.send("SMS");
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


module.exports = {
    getSms,
};