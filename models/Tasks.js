var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 1},
    description: {type: String, required: true},
    completed: {type: Boolean, default: false},
}, {timestamps: true});

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');


