require("dotenv").config();
const URL = require("url").URL;
let express = require("express");
const cors = require("cors");
let path = require("path");
let bodyParser = require("body-parser");
const multerUploads = require("multer")({ dest: "uploads/" });

let app = express();

app.use((req, res, next) => {
  console.log(`\n${req.method}-------`);
  next();
});

app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multerUploads.single("upfile"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  const resObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(resObj);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
