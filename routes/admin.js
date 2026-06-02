const express = require("express");
const adminRoutes = express();
const { AdminModel } = require("../db.js");
adminRoutes.use(express.json());

adminRoutes.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const response = await AdminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({
            mssge: "user signed up successfully!!"
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            mssge: "user is not signed up!!!"
        })
    }

})
adminRoutes.post(".signin", (req, res) => {
    const { email, password } = req.body;
})
module.exports = {
    adminRoutes: adminRoutes
}
