import { Schema, model, Document } from 'mongoose';

import bcrypt from 'bcrypt';

export interface UserAttributes extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date
  updated_at: Date
  comparePassword: (password: string, callback: (err: Error | null, isMatch: boolean) => void) => void;
}

const userSchema = new Schema<UserAttributes>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre<UserAttributes>('save', function(next) {

  if (!this.isModified('password')) {

    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {

    if (err) {

      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {

      if (err) {

        return next(err);
      }
      this.password = hash;

      next();

    });
  });
});

userSchema.methods.comparePassword = function(password: string, callback: (err: Error | null, isMatch: boolean) => 
void) {
  bcrypt.compare(password, this.password, (err, isMatch) => {

    if (err) {
      return callback(err, false);
    }
    callback(null, isMatch);
  });
};

const User = model<UserAttributes>('User', userSchema);

export default User;
