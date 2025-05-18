import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";

const MemberSchema = new mongoose.Schema({
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true,
        
    },
    age:{
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    dateofbirth: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    gender: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    placeofresidence: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    createdat: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    updatedat: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    mother: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    father: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

export const Member = mongoose.model("Member", MemberSchema);

