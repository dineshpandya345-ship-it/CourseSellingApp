const express = require("express");
const adminRoutes = express();
const { AdminModel } = require("../db.js");
adminRoutes.use(express.json());
const bcrypt = require("bcrypt");


adminRoutes.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 1);
        const response = await AdminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({
            mssge: "signed up successfull!!"
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            mssge: "User name is taken!!!!"
        })
    }

})
adminRoutes.post(".signin", (req, res) => {
    const { email, password } = req.body;

})
module.exports = {
    adminRoutes: adminRoutes
}


