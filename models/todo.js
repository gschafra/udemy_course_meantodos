/*jslint node: true */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file

var TodoSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: [true, 'Todo title required']
    }
});

var Todo = mongoose.model('todos', TodoSchema); //name of collection is 'todos'

module.exports.Todo = Todo;
module.exports.Schema = TodoSchema;