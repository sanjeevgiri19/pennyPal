import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
          // throw new Error('Invalid username or password')
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
          return done(null, false, { message: "Invalid username or password" });
        } 

        return done(null, user); 
      } catch (error) {
        return done(error);
      }
    })
  );


  passport.serializeUser((user, done) => {
    console.log("Serializing User", user._id);
    done(null, user.id);
  });


  passport.deserializeUser(async (id, done) => {
    // console.log("Deserializing User", id);
    try {
      const user = await User.findById(id).select("-password"); 
      done(null, user); 
    } catch (error) {
      done(error);
    }
  });
};

(async () => {
  try {
    await configurePassport();
  } catch (error) {
    console.error("Failed to configure Passport:", error);
  }
})();

