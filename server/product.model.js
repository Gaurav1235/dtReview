const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data we need to collect/confirm to have the app go.
const fields = {
  name: {
    type: String
  },
  description:{
    type: String
  }
  
}

// One nice, clean line to create the Schema.
const productSchema = new Schema(fields)

module.exports = mongoose.model('Product', productSchema)