const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^([0-9]{12}$)/.test(v);
            }
        },
        min: 10
    },
    note:{
        type:String,
    }
});

mongoose.model("User",userSchema);