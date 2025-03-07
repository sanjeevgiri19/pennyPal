import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  // Configure Passport.js to use local strategy for authentication
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username }); // Check if user exists in DB
        if (!user) {
          return done(null, false, { message: "Invalid username or password" }); // If not found, return error

          // throw new Error('Invalid username or password')
        }

        const isMatch = await bcrypt.compare(password, user.password); //compare password
        if (!isMatch) {
          return done(null, false, { message: "Invalid username or password" });
        } //if incorrect, return error

        return done(null, user); // Authentication successful, return user
      } catch (error) {
        return done(error);
      }
    })
  );

  // serialization is the process of converting the user's object into a format that can be stored and retrieved easily.

  // serializeUser(): This method is called when a user is successfully authenticated. It stores a piece of user information (like user.id) in the session.

  //serialize user (store user id in session)
  passport.serializeUser((user, done) => {
    console.log("Serializing User", user._id);
    done(null, user.id);
  });

  // deserializeUser(): When a request comes in with the session information, deserializeUser() retrieves the user object from the database using the stored user ID.

  //deserialize user (retrieve user from session)
  passport.deserializeUser(async (id, done) => {
    // console.log("Deserializing User", id);
    try {
      const user = await User.findById(id).select("-password"); //find user by id
      done(null, user); //return user
    } catch (error) {
      done(error);
    }
  });
};

// Initialize Passport
(async () => {
  try {
    await configurePassport();
  } catch (error) {
    console.error("Failed to configure Passport:", error);
  }
})();



// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import User from "../models/user.model.js"; // Import your User model

// export const configurePassport = () => {
//   passport.use(
//     new LocalStrategy(
//       { usernameField: "email" },
//       async (email, password, done) => {
//         try {
//           const user = await User.findOne({ email });
//           if (!user) return done(null, false, { message: "User not found" });

//           const isMatch = await user.comparePassword(password); // Ensure your model has this method
//           if (!isMatch)
//             return done(null, false, { message: "Incorrect password" });

//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     console.log("Serializing User:", user.id);
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       console.log("Deserializing User:", user);
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });
// };
