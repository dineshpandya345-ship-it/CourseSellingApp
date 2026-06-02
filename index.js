const express = require("express")
const app = express();

// now i want to make route handlers

const {adminRoutes } = require('./routes/admin.js')
const {userRoutes } = require('./routes/user.js')

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.listen(3000);