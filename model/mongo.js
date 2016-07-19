/**
 * Created by Viswanathan M B on 12/07/2016.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trackerdb');

var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    username:String
};
// create model if not exists.
module.exports = mongoose.model('user',userSchema);


