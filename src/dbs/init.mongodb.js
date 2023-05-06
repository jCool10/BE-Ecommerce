"use strict";

const mongoose = require("mongoose");

const mongoDBURL =
  "mongodb+srv://jcool:jcool@betoturial.i1heqgr.mongodb.net/?retryWrites=true&w=majority";

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(mongoDBURL)
      .then((_) => console.log("Connected Mongo DB Success"))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
