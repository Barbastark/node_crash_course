
// To run javascript files, type node + filename
// File extension is not necessary

// The global object is called global
// The global object represents the global
// environment in node.

//console.log(global)

/************************************
 * **** __dirname and __filename ****
 * **********************************
 * 
 * - dirname represents the absolute path
 *   to the current directory.
 * 
 * - filename represents the absolute 
 *   path to the current directory with
 *   name of the current file added on
 *   to it.
 */

//console.log(__dirname);
//console.log(__filename);

/******************************************
 * **** Importing and exporting files  ****
 * ****************************************
 * 
 * - When a file is imported using the require
 *   method it automatically runs.
 * 
 * - By default the require method returns an 
 *   empty object.  
 */

const imports = require("./assets/imports");

//console.log(`${assets/imports.people}\n${assets/imports.ages}`)

// Using destructuring
const {people, ages} = require("./assets/imports");

//console.log(people)
//console.log(ages)

/**** Built-in core modules ***/

/*************************
 * **** The os module ****
 * ***********************
 * 
 * - A built-in core module that returns
 *   an object containing information about
 *   the current operating system. 
 *   
 */

const os = require("os");

// Some useful methods provided by the os module.

// Returns thename of the current platform.
const platform = os.platform();

// Returns the absolute path to home directory of the current user.
const homeDir = os.homedir();
console.log(homeDir);

/*************************
 * **** The fs module ****
 * ***********************
 * 
 * - Enables interaction with the file system.
 * 
 * - Read, write, modify or delete files on the filesystem.
 * 
 */

const fs = require("fs");
const { resolveInclude } = require("ejs");

/*******************************
 * **** The readFile method ****
 * *****************************
 * 
 * - Reads content from a file. 
 * 
 * **** Params ***
 *   path: relative path to the file you want to read.
 *   callback: a function that takes err and data as parameters.
 *    
 * 
 */

fs.readFile("./assets/sample.txt", (err, data) => {
  if(err) {
    console.log(err);
  }
  // Data is a buffer, to display as string use toString()
  console.log(data.toString());
})
/********************************
 * **** The writeFile method ****
 * ******************************
 * 
 * - Writes text to a file.
 * 
 * - If file exists, the content will be overwritten.
 * 
 * - If it doesn't exist, a file will be created before
 *   text is written to file. 
 * 
 * **** Params ****
 * 
 * path: relative path to the file you want to write to.
 * text: the text you want to write to the file.
 * callback: 
 *  
 */
fs.writeFile("./assets/sample_write_text.txt", "Haha!!", () => {
  console.log("Haha was written to a text file haha!");
});

/***************************************
 * **** The mkdir and rmdir methods ****
 * *************************************
 * 
 * - mkdir creates a new directory.
 * 
 * - If the directory exists, an error wil be thrown.
 *   To prevent this, use the fs.existsSync method.
 * 
 * - rmdir only removes empty directories.
 *  
 * **** params ****
 * 
 * dirname: relative path followed by name of directory
 *          to be created.
 * 
 * callback: takes err as parameter
 */

// mkdir
if (!fs.existsSync("./assets/dumb_directory")) {
  fs.mkdir("./assets/dumb_directory", (err) => {
    if(err) {
      console.log(err);
    }
    console.log("Directory was created haha!!");
  });
}

// rmdir
if (fs.existsSync("./assets/dumb_directory")) {
  fs.rmdir("./assets/dumb_directory", (err) => {
    if(err) {
      console.log(err);
    }
    console.log("Directory was deleted haha!!");
  });
}

/*****************************
 * **** The unlink method ****
 * ***************************
 * 
 * - Deletes file if it exists.
 * 
 * - If file doesn't exist it throws
 *   an error.
 * 
 * **** Params ****
 * 
 * path: relative path to file.
 * callback:  
 * 
 */

if (fs.existsSync("./deleteme.txt")) {
  fs.unlink("./deleteme.txt", (err) => {
    if(err) {
      console.log(err);
    }
    console.log("file deleted haha!!");
  });
}

/*******************************
 * **** Streams and buffers ****
 * *****************************
 * 
 * - Start using data before it has finished loading.
 * 
 * - Small chunks of data called buffers are sent down
 *   the stream as soon as the buffer fills. 
 * 
 * - Read, write and duplexstreams
 */


/**** Read streams ****/
const readStream = fs.createReadStream("./assets/humungus.txt");
const readStreamEncoded = fs.createReadStream("./assets/humungus.txt", { encoding: "utf8" });

// without no options object containing encoding passed to createReadStream

readStream.on("data", (chunk) => {
  console.log("------ NEW CHUNK HAS ARRIVED HAHA!! -----")
  console.log(chunk.toString());
});

// with no options object containing encoding passed to createReadStream
readStreamEncoded.on("data", (chunk) => {
  console.log("------ NEW CHUNK HAS ARRIVED HAHA!! -----")
  console.log(chunk);
});

/**** Write streams ****/

const writeStream = fs.createWriteStream("./assets/humungus_uploaded.txt")

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

/**** Piping *****/

// Used when passing data directly from a readable to a writable stream.
// Must be from a readable to a writable stream.
// Does the same thing as the previous example.

readStream.pipe(writeStream);



/**************************************
 * **** View Engines and Templates ****
 * ************************************
 * 
 * - View engines, also called template engines, are used to 
 *   inject dynamic content into html pages.
 * 
 * - EJS is a popular view engine.
 * 
 * - Templates are processed through the view engine on the server
 *   before its sent to the browser.
 * 
 * - This process is called server side rendering. 
 *  
 * - Passing dynamic data into a view is accomplished by passing
 *   an object as second argument to the render method.
 * 
 */

/********************
 * **** Partials ****
 * ******************
 * 
 * - A partial is a part of a template that can be 
 *   included in different views.
 * 
 * - Avoids repetition and keeps code dry. 
 * 
 * - <%- include=(relative_path_to_file)) %> 
 * 
 * - The minus sign is used when including partials
 *   since it doesn't escape special characters.
 * 
 * - The equal sign escapes special characters which results
 *   in a string value being outputted.
 * 
 */

/**********************
 * **** Middleware ****
 * ********************
 * 
 * - Code that runs (on the server) between getting a 
 *   request and sending a response.
 * 
 * - In express, the use() method is used to run middleware.
 * 
 * - The next() method tells the middleware that its finnished
 *   and move on.
 * 
 * - If next method is left out, the code hangs.
 *   
 * **** Third Party Middleware ****
 * 
 * - Morgan: logger middleware
 * 
 * 
 * **** Middleware Examples
 * 
 * - Logger middleware to log details of every request.
 * 
 * - Authentication check middleware for protected routs.
 * 
 * - Middleware to parse JSON data from requests.
 * 
 * - Return 404 pages.
 * 
 * */

/*************************************************************
 * Buckle up cause here comes some middleware in action haha!!
 *  */ 

// A pretty stupid piece of middleware
app.use((req, res, next) => {
  console.log("____Request Incoming____");
  console.log("Host: ", req.hostname);
  console.log("Path: ", req.path);
  console.log("Method: ", req.method);
  next();
});

// Another even more stupid piece of middleware to hammer home a point
app.use((req, res, next) => {
  console.log("____A Pointless Middleware____");
  console.log("Another piece of meaningless middleware");
  next();
});

/*******************************************
 * ****  Allow Browser Access To Files  ****
 * *****************************************
 * 
 * - In order for the browser to get access to files we have to 
 *   specify what files should be allowed to be accessed.
 * 
 * - By default the server protects all of our files from being 
 *   accessed by users in the browser.
 * 
 * - This can be accomplished using the static middleware that
 *   comes with express.
 * 
 *  */ 

// Makes files inside the public directory accessible to the browser.
const express = require("express");
app.use(express.static("public"));

/****************************************
 * **** Mongo DB and NoSQL Databases ****
 * **************************************
 * 
 * - MongoDB is a NoSql database
 * 
 * - Stands for not only sql
 * 
 * **********************
 * **** NoSQL vs SQL ****
 * **********************
 * 
 * ------------------------------
 * SQL       |      NoSQL
 * ------------------------------
 * Tables           Collections
 * Rows             Documents
 * Columns          ?
 * ------------------------------
 * 
 * *****************
 * **** MongoDB ****
 * *****************
 * 
 * Collections: Stores a particular type of data, e.g. users or customers.
 * 
 * Documents: A collections store documents. Each document in a collection
 *            has a unique, auto-generated _id. 
 *   
 * ******************
 * **** Mongoose ****
 * ******************
 * 
 * - Mongoose is an ODM library
 * 
 * - ODM: Object Document Mapping
 * 
 * - Provides a simplified way to connect to and communicate with the database.
 * 
 * - This is accompliched by allowing us to create simple data models which have
 *   database query methods to create, read, update and delete db documents.
 * 
 * **************************
 * **** Schemas & Models ****
 * **************************
 * 
 * - Schemas defines the structure of a type of data / document stored in 
 *   a database collection.   
 * 
 * - Models allow us to communicate with database collections.
 * 
 * 
 */