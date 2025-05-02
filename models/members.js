import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    age:{
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    DateOfBirth: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    gender: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refrence from user
    },
   
});

export const Member = mongoose.model("Member", MemberSchema);

