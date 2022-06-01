
let ejs = require("ejs");

const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const DB_URI = "mongodb+srv://raskolnikov:test1234@cluster0.bgru9.mongodb.net/node_crash_course?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("express/lib/response");

mongoose.connect(DB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected to db haha!!");
  })
  .catch((err) => console.log(err))

// express app. app is a common convention
const app = express();

// set view engine
// views folder is default
app.set("view engine", "ejs")

// changes views folder
app.set("views", "dynamic_views")

// listen for requests
//app.listen(3000);

// Middleware using morgan
app.use(morgan("dev"));

// Middleware for static files
// Makes files inside the public directory accessible to the browser.
app.use(express.static("public"));

// urlencoded
app.use(express.urlencoded({ extended: true }));

// mongoose and mongo sandbox routes.
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Post",
    snippet: "This is a stupid post haha!!",
    body: "And some more stupid text haha!"
  });

  blog.save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);    
      });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

app.get("/single-blog", (req, res) => {
  Blog.find("629474d016ec60dc55712f62")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
});

app.get("/", (req, res) => {

  /***************************
   * **** res.send method ****
   * *************************
   * 
   * - inferres the type of content that we're trying to send to the browser
   *   and automatically sets the content-type header.
   * 
   * - it also inferres the status code so we dont have to set that manually.
   */
  //res.send('<h1>Home page</h1>');
  
  /*******************************
   * **** res.sendFile method ****
   * *****************************
   * 
   * - Takes the absolute path as its first parameter.
   * 
   * - Can be set as a relative path if root, which represents the path to 
   *   the current directory, is set in the options object.
   * 
   * - If a match is found the rest of the get functions will not be called.
   * 
   * **** Params ****
   * 
   * absolute path
   * options object
   *  
   */
  
  // this can be accoplished using the path module, which is a core module in node.
  // sets static html page 
  //res.sendFile("./views/index.html", { root: __dirname });

  // sets dynamic html file
  //res.render("index", { title: "Home" });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { title: "All Blogs", blogs: result });
      })
      .catch((err) => {
        console.log(err);
      });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
      .then((result) => {
        res.render("details", { blog: result, title: "Blog Details" });
      })
      .catch((err) => {
        console.log(err);
      });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => {
        console.log(err);
      });
});
// Redirects 
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("create", { title: "New Blog Post" });
});
/************************
 * **** The 404 Page ****
 * **********************
 * 
 * - Only fires if no match is found in the previous get functions.
 *  
 * - This code will fire for every single request, regardless of url, if the
 *   execution reaches this point in the code.
 *  
 * - http status code has to be set manually
 */

app.use((req, res) => {
  //res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });

});
