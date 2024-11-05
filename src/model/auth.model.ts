import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  generateAuthToken: () => string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { collection: "auth" }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_SECRET || 'defaultSecret', {
    expiresIn: '1h',
  });
  return token;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
