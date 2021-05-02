import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import { urlencoded } from "body-parser";


const app = express();
app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));

// to serve the static files
app.use(express.static(__dirname + "/public/"));

var items = [];
var workItem = [];

app.get("/", function (req, res) {

    var today = new Date();
    var currentDay = today.getDay();
    // 0 - Sunday, 6 - Saturday 

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { day: day, items: items });

});


app.post("/", (req, res) => {
    var item = req.body.addNext;
    // console.log(item);
    // console.log(req.body.list);

    if (req.body.list === "Work") {
        workItem.push(item);
        res.redirect("/work");
    } else {
        items.push(item)
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { day: "Work List", items: workItem });
});

app.post("/work", (req, res) => {
    var item = req.body.addNext;

    console.log(item);
    workItem.push(item);
    res.redirect("/work");
});

app.listen(3000, function () {
    console.log("Server started at 3000 port");
})