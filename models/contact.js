const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name must be less than 50 characters']
    },
    contactNo: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // example for a 10 digit number
            },
            message: v => `${v.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    subject: {
        type: String,
        required: true,
        minlength: [2, 'Subject must be at least 2 characters long'],
        maxlength: [100, 'Subject must be less than 100 characters']
    },
    message: {
        type: String,
        required: true,
        minlength: [10, 'Message must be at least 10 characters long'],
        maxlength: [500, 'Message must be less than 500 characters']
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Contact", contactSchema);
