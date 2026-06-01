const express = require("express")
const app = express();

// now i want to make route handlers

const adminRoutes = require('./routes/admin.js')

app.post("/admin",adminRoutes);







app.listen(3000);