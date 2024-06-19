import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User";
import bcrypt from "bcrypt";

passport.serializeUser((user: any, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside deserializeUser`);
  console.log(`Deserializing User Id: ${id}`);
  try {
    const findUserById = await User.findById(id);
    if (!findUserById) {
      throw new Error("User not found during deserialization");
    }

    done(null, findUserById);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUserByUsername = await User.findOne({ username });
      console.log(findUserByUsername);
      if (!findUserByUsername) throw new Error("User not found");

      const passwordMatch = await bcrypt.compare(
        password,
        findUserByUsername.password
      );
      
      if (!passwordMatch) {
        throw new Error("Invalid Credentials");
      }
      done(null, findUserByUsername);
    } catch (err) {
      done(err, false);
    }
  })
);
