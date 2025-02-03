import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth";
import oauthRoutes from "./routes/oauth";
import "./config/passport"; // Ensure passport config is loaded

dotenv.config();
const app = express();

app.use(express.json());
app.use(session({ secret: "your_secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/oauth", oauthRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Welcome to the API! 🎉");
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



