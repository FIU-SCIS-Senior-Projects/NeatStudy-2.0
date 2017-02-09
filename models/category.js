var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    activities: [{
        name: String,
        sprints: [{
            startDate: Date,
            scores: [Number]
        }]
    }]

});

module.exports = mongoose.model('Category', Category);
