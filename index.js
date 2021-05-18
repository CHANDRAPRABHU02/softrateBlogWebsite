const { response } = require("express");
const express = require("express");
const DB = require("nedb");
const db = new DB("database.db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
db.loadDatabase();
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
console.log("Listening to ", PORT);
app.use(express.json({ limit: "1mb" }));

app.listen(PORT, () => {});
app.use(express.static("resource"));

app.get("/getHomePage", cors(), (data, response) => {
  db.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "resource/uploads",
});

let imgCounter = 1;
let backupOfpath = "";

uploadSingleFile = (curFile, res) => {
  const tempPath = curFile.path;
  const curEx = path.extname(curFile.originalname).toLowerCase();
  const targetPath = path.join(
    __dirname,
    `./resource/uploads/image${imgCounter}${curEx}`
  );

  backupOfpath = `uploads/image${imgCounter++}${curEx}`;
  // console.log(targetPath);

  if (path.extname(curFile.originalname).toLowerCase() === ".png" || true) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
    });
  }
};

app.post(
  "/upload",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "pic",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    req.files = await JSON.parse(JSON.stringify(req.files));
    req.body = await JSON.parse(JSON.stringify(req.body));
    // console.log(req.body);
    if (req.files.file != null) uploadSingleFile(req.files.file[0], res);
    const backgroundpic = backupOfpath;
    if (req.files.pic != null) uploadSingleFile(req.files.pic[0], res);
    const authorPic = backupOfpath;
    const jdata = {
      title: req.body.title,
      homePageRelativePath: backgroundpic,
      authorPic: authorPic,
      blogPage: req.body.blogPage,
      content: req.body.content,
      author: req.body.author,
      timePosted: Date.now(),
      // timePosted: new Date(Date.now()),
    };
    // console.log(jdata);
    db.insert(jdata);
    res.status(200).contentType("text/plain").end("File uploaded!");
  }
);

app.post("/login", (req, res) => {
  console.log(req.body);
  if (
    req.body.usrname == "softrate-2020" &&
    req.body.password == "softrate@2020"
  ) {
    res.redirect("/create");
  } else res.end(`<h1>Invalid login</h1>`);
});

const jdata1 = {
  title: "AR and VR",
  homePageRelativePath: "assets/img/ar.jpeg",
  blogPage: "Blog_Page.html",
  content:
    "Virtual Reality is the first step in a grand adventure into the landscape of the imagination",
  author: "ABC",
  timePosted: new Date("07/30/2019"),
  // timePosted: new Date(Date.now()),
};

const jdata2 = {
  title: "AR and VR",
  homePageRelativePath: "assets/img/ar.jpeg",
  blogPage: "Blog_Page.html",
  content:
    "Virtual Reality is the first step in a grand adventure into the landscape of the imagination",
  author: "ABC",
  timePosted: new Date("01/30/2021"),
  // timePosted: new Date(Date.now()),
};

// db.insert(jdata1);
// db.insert(jdata2);
