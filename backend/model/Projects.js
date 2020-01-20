var mongoose = require('mongoose')
var ProjectSchema = mongoose.Schema({
   title:       {type: String, default: ''},
   description: {type: String, default: ''},
   pros:        {type: String, default: ''},
   cons:        {type: String, default: ''},
   whatFor:     {type: String, default: ''},
   viewHandler: {type: String, default: ''},
   whatDoINeed: {type: String, default: ''},
   nextSteps:   {type: String, default: ''},
   notes:       {type: String, default: ''},
   leftCol:     {type: String, default: ''},
   rightCol:    {type: String, default: ''},
   version:     {type: Number, default: Math.floor(new Date().getTime() / 1000)},
})

ProjectSchema.methods.getCurrentVersion = async function() {
   return await this.model('Project')
            .find({ title: new RegExp(  '^' + this.title + '$' , 'i') })
            .sort({'version': -1}).limit(1)
};

module.exports = mongoose.model('Project', ProjectSchema)
