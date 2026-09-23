// NOTE: i went to "https://github.com/laranicholas" like
// it said in the instructions but there was no IE4 or any code
// so i found this code elsewhere

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "users_list" },
);

const User = mongoose.model("User", UserSchema);

export default User;
