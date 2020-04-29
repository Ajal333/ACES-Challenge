const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// CREATE SERVER
const server = express();

// USING ASSETS
server.use("/assets/css", express.static(__dirname + "/assets/css"));
server.use("/assets/img", express.static(__dirname + "/assets/img"));
server.use("/assets/js", express.static(__dirname + "/assets/js"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//SETTING VIEW ENGINE
server.set("view engine","ejs");

server.get("/", (req, res) => {
    res.render("index");
    console.log("Index page loaded...");
  });

server.get("/thankyou", (req, res) => {
    res.render("thanku");
    console.log("Form submitted...");
  });

server.post("/submit", (req, res) => {
    evname = req.body.evname;
    caption = req.body.caption;
    desc = req.body.desc;
    reg = req.body.reg;
    coname = req.body.coname;
    email = req.body.email;
    console.log(evname);
});

const port = process.env.port | 7000
server.listen(port, () => {
    console.log("Server running at port "+port);
});