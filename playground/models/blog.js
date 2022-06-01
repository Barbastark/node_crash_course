const mongoose = require("mongoose");
/**
 * - a schema defines the structure of the documents that will be 
 *   stored inside a collection.
 */
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  } 
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;