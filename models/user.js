import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    age:{
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    datecreated: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
 
});

export const User = mongoose.model("User", UserSchema);

