const express = require("express");
const userRoutes = express();
const { UserModel, CourseModel, PurchaseModel } = require("../db.js");
userRoutes.use(express.json());
const bcrypt = require("bcrypt");
const { jwt, USER_SECRET } = require("../auth.js")
const { userMW } = require("../middleWares/mw.js")

userRoutes.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 1);
        const response = await UserModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({
            mssge: "user signed up successfull!!"
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            mssge: "User name is taken!!!!"
        })
    }
})


userRoutes.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        email: email,
    })
    if (user) {
        const hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            // ab token dena he!
            const token = jwt.sign({
                id: user._id
            }, USER_SECRET);

            res.json({
                token: token
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

// // create course(auth needed)

userRoutes.get("/course/all-courses",  async (req, res) => {
    console.log("user mw enter")
    try{
        const courses = await CourseModel.find({});
        res.json({
            courses
        })
    }
    catch(err)
    {
        res.json({
            error:err
        })
    }
})

userRoutes.get("/course/purchase", userMW, async (req, res) => {
    const userId = req.id;
    const courseId = req.body.courseId;
    try{
        const response = await PurchaseModel.create({
            userId:userId,
            courseId:courseId
        })
        res.status(200).json(
            {
                mssge:"course purchased successfully!"
            }
        )
    }
    catch(err)
    {
        res.status(200).json({
            error:error
        })
    }
})

userRoutes.get("/course/purchased-course", userMW, async (req, res) => {
    const userId = req.id;
    try{
        const response = await PurchaseModel.find({
            userId:userId,
        })
        res.status(200).json(
            {
                "purchased courses:":response
            }
        )
    }
    catch(err)
    {
        res.status(200).json({
            error:error
        })
    }
})

module.exports = ({
    userRoutes: userRoutes
})


