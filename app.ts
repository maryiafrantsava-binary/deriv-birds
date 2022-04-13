const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURi"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true//9F9HY69NiT2DNgDb
    });
    app.listen(PORT, () => console.log(`app has been started ${PORT}...`));
  } catch (e) {
    if (e instanceof Error) {
      console.log("Server Error", e.message);
    }
    process.exit(1);
  }
}
start();
