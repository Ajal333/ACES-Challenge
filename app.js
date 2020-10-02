const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4'); 

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
    console.log("\nIndex page loaded...");
  });

server.get("/success", (req, res) => {
    res.render("success");
    console.log("Form submitted...");
  });
// Path to save images
const upload = multer({dest : __dirname+'/uploads/'});

server.post("/submit", upload.single("image"), (req, res) => {
    evname = req.body.evname;
    caption = req.body.caption;
    desc = req.body.desc;
    if (req.body.reg==='0')
      reg = 'NA';
    else
      reg = req.body.reg;
    coname = req.body.coname;
    email = req.body.email;

    // Uploading Image to ./uploads/
    const tempPath = req.file.path;
    const imageName = uuid().toString()+'.png';
    const targetPath = path.join(__dirname, "./uploads/"+imageName);

    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
      fs.rename(tempPath, targetPath, err => {
        if (err) 
          return handleError(err, res);
      });
    } 
    else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png and .jpeg files are allowed!");
      });
    }
    //Image Uploaded..!
    let details = `
    Event Details
    Event Name : ${evname}
    Caption : ${caption}
    Description : ${desc}
    Registration : ${reg}
    Image : ./uploads/${imageName}

    Co-ordinator Details
    Name : ${coname}
    Email : ${email}
    _________________________________________________
    `;
    fs.appendFile("registration_details.txt", details, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Details Saved...");
  });
    res.redirect('/success');
});

// PORT DETAILS
const port = process.env.port || 7000
server.listen(port, () => {
    console.log("Server running at port "+port);
});
