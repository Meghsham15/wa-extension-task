const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/waExtensionDB");
require("./models/user");
let User = mongoose.model("User");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send({ root: "Hello this is root directory" });
});

app.post("/addUserNotes", async function (req, res) {
    let data = req.body;
    let user = new User({
        contactName: data.contactName,
        phoneNumber: Number(data.phoneNumber),
        note: data.note
    });
    try {
        const result = await user.save();
        // Handle the success case
        res.status(200).send({
            message: 'User added successfully!',
            user: result,
            status:true
        });
    } catch (err) {
        // Handle the error case
        res.status(500).send({
            message: 'Failed to add user',
            error: err,
            status:false
        });
    }
});

app.post("/getUserNotes",async function (req, res) {
    let phoneNumber = req.body.phoneNumber;
    try {
        const user = await User.findOne({ phoneNumber: phoneNumber });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Error finding user',
            error: err
        });
    }
});

app.listen("3000", function () {
    console.log("server running at port 3000");
});
