
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

