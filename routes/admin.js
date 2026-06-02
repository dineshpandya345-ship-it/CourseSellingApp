const express = require("express");
const adminRoutes = express();
const { AdminModel } = require("../db.js");
adminRoutes.use(express.json());
const bcrypt = require("bcrypt");
const {jwt,ADMIN_SECRET} = require("../auth.js")

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
adminRoutes.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({
        email: email,
    })
    if(user) {
        const hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password,hashedPassword);
        if(isMatch)
        {
            // ab token dena he!
            const token = jwt.sign({
                id:user._id
            },ADMIN_SECRET);

            res.json({
                token:token
            })
        }
    }
    else {
        res.json(
            { mssge: "user does not exist!!" }
        )
    }
}
)

module.exports = {
    adminRoutes: adminRoutes
}

