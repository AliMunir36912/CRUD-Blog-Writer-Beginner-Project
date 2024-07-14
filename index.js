const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const blogSeeds = require('./seeds/blogSeeds');
const methodOveride = require('method-override');
const mongoose = require('mongoose');
const blog = require('./schema.js');
const Blog = require('./schema.js');


mongoose.connect('mongodb://127.0.0.1:27017/blogDatabase')
    .then(()=> {
        console.log("Connection Sucessfull!")
    })
    .catch((e) => {
        console.log("Error!")
        console.log(e)
    })


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride('_method'));


app.get("/", async (req, res) => {
    let allBlogs = await blog.find({});
    console.log(allBlogs);
    res.render("read.ejs", {allBlogs});
});

app.get("/create", async(req, res) => {
    res.render("create.ejs");
})

app.post("/", async(req, res) => {
    const {title, description } = req.body;
    blogSeeds.push({title, description})
    let addBlog = new blog(req.body);
    await addBlog.save();
    res.redirect("/")
})

app.post("/edit/:id", async (req, res) => {
    // console.log("Edit Request Called")
    const {id} = req.params;
    const {title, description} = req.body;

    res.render("edit.ejs", {description, title, id})
})

app.patch("/", async (req, res) => {
    console.log("patch request received.")
    const {updateDescription, title, id} = req.body;
    await Blog.findByIdAndUpdate(id, {description: updateDescription});
    res.redirect("/")
})

app.delete("/", async (req, res) => {
    console.log("Delete request received.")
    const {_id} = req.body;
    await Blog.findByIdAndDelete(_id);
    res.redirect("/")
    
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

