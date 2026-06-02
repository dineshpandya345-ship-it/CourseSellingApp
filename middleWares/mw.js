const {jwt,ADMIN_SECRET,USER_SECRET} = require("../auth.js");


function adminMW(req,res,next)
{
    try{
    const token = req.headers.token;
    const response = jwt.verify(token,ADMIN_SECRET);
     req.id = response.id;
        next();
    }
    catch
    {
        res.json({
            mssge:"admin is not verified!"
        })
    }
}


function userMW(req,res,next)
{
    try{
    const token = req.headers.token;
    const response = jwt.verify(token,USER_SECRET);
     req.id = response.id;
        next();
    }
    catch
    {
        res.json({
            mssge:"user is not verified!"
        })
    }
}

module.exports = {
    adminMW,
    userMW
}