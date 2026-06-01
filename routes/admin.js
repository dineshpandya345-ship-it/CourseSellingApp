const express = require("express");
const adminRoutes = express();
adminRoutes.use(cors);
adminRoutes.use(express.json());

adminRoutes.post("/signup",(req,res)=>
{
    const {email,password,firstName,lastName} = req.body;

})