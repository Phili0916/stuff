const mongoose = require('mongoose');
const {STATUS_NEW, STATUS_USED, STATUS_LOST, STATUS_BROKEN} = require("../helper/constants");
const {CATEGORY_MOUSE, CATEGORY_MONITOR, CATEGORY_SCREENS, CATEGORY_KEYBOARDS, CATEGORY_LAPTOPS,
      CATEGORY_DESKTOPS, CATEGORY_HEADPHONES, CATEGORY_MICROPHONES, CATEGORY_PHONES, CATEGORY_TABLETS, CATEGORY_CHAIRS, CATEGORY_TABLES,
      CATEGORY_OFFICE_SUPPLIES, CATEGORY_KITCHEN, CATEGORY_LABOR, CATEGORY_PIANOS, CATEGORY_VIOLINS, CATEGORY_GUITARS,
      CATEGORY_MISCELLANEOUS} = require("../helper/constants");

const {Schema} = mongoose;
// const model = require("mongoose");

const StuffSchema = new Schema({
  title: {type: String, required: true},
  type: {
    type: String,
    required: true},
  category: {
    type: Number,
    enum: [
            CATEGORY_MOUSE,
            CATEGORY_MONITOR,
            CATEGORY_SCREENS,
            CATEGORY_KEYBOARDS,
            CATEGORY_LAPTOPS,
            CATEGORY_DESKTOPS,
            CATEGORY_HEADPHONES,
            CATEGORY_MICROPHONES,
            CATEGORY_PHONES,
            CATEGORY_TABLETS,
            CATEGORY_CHAIRS,
            CATEGORY_TABLES,
            CATEGORY_OFFICE_SUPPLIES,
            CATEGORY_KITCHEN,
            CATEGORY_LABOR,
            CATEGORY_PIANOS,
            CATEGORY_VIOLINS,
            CATEGORY_GUITARS,
            CATEGORY_MISCELLANEOUS
          ],
    default:CATEGORY_MISCELLANEOUS
  },
  description: {type: String, required: true},
  price: {type: Number, required: true},
  ownerId: {type: String, required: true},
  reference: {type: String, required: true},
  options: {type: Object},
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
  }
})
const ModelStuff = mongoose.model('stuff', StuffSchema);
module.exports = ModelStuff
// module.exports = {StuffModel: mongoose.model('stuff', StuffSchema)}


//import mongoose from 'mongoose';


