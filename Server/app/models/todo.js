var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var priorities = ['low', 'Medium', 'High', 'Critical'];


var ToDoSchema = new Schema({ 

    user: {type: Schema.Types.ObjectId, requires: true},
    todo: {type: String, required: true},
    description: {type: String},
    dateCreated: {type: Date, default: Date.now},
    dateDue: { type: Date, default: Date.now},
    completed: { type: Boolean, default: false},
    priotiry: { type: String, enum: priorities},
    file: {
        filename:{type: String},
        originalName: { type: String},
        dateUploaded: { type: Date, default: Date.now}
    }

})

module.exports = Mongoose.model('Todo', ToDoSchema);