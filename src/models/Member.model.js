import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    firstname: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    lastname: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    age: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    dateofbirth: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    gender: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    placeofresidence: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    mother: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    father: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Member = mongoose.model("Member", MemberSchema);
