var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    timestamp: Date,
    done: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
