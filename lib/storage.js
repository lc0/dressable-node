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
      positive : {
	number: Number
	, people: [People]
	}
    , negative  : {
        number: Number
        , people: [People]
        }
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


var Person = mongoose.connection.model('facebook', People);
/*var p = new Person({'name':'Sergii', 'surname':'Khomenko', 'facebookId':1440889227});
p.choises.push({'title':'nice jacket', 'description':'I like it! Do you?', 'image':'/img/man3.jpg',});
p.save() // works
//*/

module.exports = {
  addComment: function (uid, cid, body) {
  },
  getChoise: function (id) {
	Person.find({'choises._id':ObjectId(id)}, function (err, post) {
  	if (!err) {
		return post;
      		// do something
    	});
  }

	);
  }

}; 
