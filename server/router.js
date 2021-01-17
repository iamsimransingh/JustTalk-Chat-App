const express = require('express');//importing
const router = express.Router();//importing router from express and calling it
router.get("/", (req,res) =>{//get request for router with request and response
 res.send({response: "server is up and running."}).status(200);//responding with message of server running   
});
module.exports = router;//exporting router