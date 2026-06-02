// - Define the schema for User, Admin, Course, Purchase

const dns = require("dns")
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pandyadhruv67_db_user:942v8bQwTGieURGF@cluster0.nbd7hw5.mongodb.net/courseSelling-app");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const AdminSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const PurchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const UserModel = mongoose.model('users', UserSchema);
const AdminModel = mongoose.model('admin', AdminSchema);
const CourseModel = mongoose.model('courses', CourseSchema);
const PurchaseModel = mongoose.model('purchase', PurchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}
