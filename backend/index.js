import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import connectDB from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.js";
import helmet from "helmet";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 9000;
const app = express();
const httpServer = http.createServer(app);
express.json();
app.use(helmet());

const _dirname = path.resolve();

const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
store.on("error", (err) => console.error("Session Store Error:", err));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   process.env.CORS_ORIGIN,
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         return callback(
//           new Error("CORS policy does not allow this origin"),
//           false
//         );
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

//jaile pani session middleware lai passport vanda paila lekhni (in most cases)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
    },
  })
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log("Session Data:", req.session);
  // console.log("User Data:", req.user);
  next();
});

//  GraphQL Context
const createContext = async ({ req, res }) => ({
  req,
  res,
  getUser: () => req.user,
  login: (user) =>
    new Promise((resolve, reject) => {
      req.login(user, (err) => {
        if (err) return reject(err);
        resolve();
      });
    }),
  logout: () =>
    new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) return reject(err);
        resolve();
      });
    }),
  authenticate: (strategy, options) =>
    new Promise((resolve, reject) => {
      passport.authenticate(strategy, options, (err, user, info) => {
        if (err) return reject(err);
        if (!user) return reject(new Error("Invalid credentials"));
        resolve(user);
      })(req, res, () => {});
    }),
});

//  Apollo Server setup
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: createContext,
    })
  );

  app.get("/", (req, res) => {
    console.log("Server is running...");
    res.send("GraphQL Server is running!");
  });

  app.use(express.static(path.join(_dirname, "/frontend/dist/")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });

  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
  });
}

startServer();
