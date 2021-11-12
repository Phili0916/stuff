const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const {STATUS_NEW, STATUS_USED, STATUS_LOST, STATUS_BROKEN} = require("../helper/constants");
const {CATEGORY_MOUSE, CATEGORY_MONITOR, CATEGORY_SCREEN, CATEGORY_KEYBOARD, CATEGORY_LAPTOP,
      CATEGORY_DESKTOP, CATEGORY_HEADPHONE, CATEGORY_MICROPHONE, CATEGORY_SPEAKERPHONE, CATEGORY_MOBILE, CATEGORY_TABLET,
      CATEGORY_MISCELLANEOUS} = require("../helper/constants");

const {Schema} = mongoose;
const customLabels = {
  totalDocs: 'total',
  docs: 'stuff'
}

mongoosePaginate.paginate.options = {
  customLabels
}


// const model = require("mongoose");

const StuffSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  category: {
    type: Number,
    enum: [
      CATEGORY_MOUSE, CATEGORY_MONITOR, CATEGORY_SCREEN, CATEGORY_KEYBOARD, CATEGORY_LAPTOP,
      CATEGORY_DESKTOP, CATEGORY_HEADPHONE, CATEGORY_MICROPHONE, CATEGORY_SPEAKERPHONE, CATEGORY_MOBILE, CATEGORY_TABLET,
      CATEGORY_MISCELLANEOUS
    ],
    default:CATEGORY_MISCELLANEOUS,
    required: true,
  },
  price: {type: Number, required: true},
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: false},
  reference: {type: String, required: false},
  status: {
    type: Number,
    enum: [STATUS_NEW, STATUS_USED, STATUS_LOST, STATUS_BROKEN],
    default: STATUS_NEW
  },
  localisation: {
    address: {
      type: String
    },
    zipCode: {
      type: String
    },
    city: {
      type: String}
  },
  options:{type:Object}
})
StuffSchema.plugin(mongoosePaginate)
const ModelStuff = mongoose.model('stuff', StuffSchema);
module.exports = ModelStuff


