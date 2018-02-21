const express = require("express");
const app = express();
const router = require("./controller");

app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.set("view engine", "ejs");

app.get("/", router.showIndex);
app.get("/:albumName", router.showAlbum);
app.get("/up", router.showUp);
app.post("/up", router.doShowUp);
app.use(function(req, res) {
    res.render("err");
});

app.listen(3000);