//var https = require('https');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dressable');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Comments = new Schema({
    author     : ObjectId
  , sender     : String
  , comment    : String
  , choise     : String
  , date       : Date
});

var Choises = new Schema({
    author    : ObjectId
  , title     : String
  , description : String
  , image       : String
  , date      : Date
  , comments  : [Comments]
  , votes      : {
      positive : Number
    , negative  : Number
  }
});

var People = new Schema({
  name     : String
  , surname : String
  , image       : String
  , comments  : [Comments]
  , choises : [Choises]
  , friends : [People]
});


module.exports = {
  addComment: function (uid, cid, body) {
  }

}; 
