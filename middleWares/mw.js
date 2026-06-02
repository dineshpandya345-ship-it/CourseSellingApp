const {jwt,ADMIN_SECRET,USER_SECRET} = require("../auth.js");

function adminMW(req,res,next)
{
    try{
    const token = req.headers.token;
    const response = jwt.verify(token,ADMIN_SECRET);
    
        next();
    }
    catch
    {
        res.json({
            mssge:"admin is not verified!"
        })
    }
}

module.exports = {
    adminMW
}