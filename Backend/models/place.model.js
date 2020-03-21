
const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId
const moment = require('moment')
const customerTypes = require('../helpers/customerTypes.json')

const place = mongoose.Schema({
    renters: [{
        type: ObjectID,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: customerTypes,
        default: customerTypes[0] // employee
    },
    description: {
        type: String,
        required: true
    },
    images: [String],
    location: {
        lat: String,
        lng: String
    },
    areaName: String,
    isAvailable: {
        type: Boolean,
        default: true
    },
    price: {
        currency: String,
        amount: Number
    },
    residents: {
        maximum: Number,
        current: Number
    },
    filters: {
        isFurnished: { type: Boolean, default: false },
        bedrooms: { type: Number, default: 1 },
        bathrooms: { type: Number, default: 1 },
        areaM2: { type: Number, default: null },
    },
    createdAt: {
        type: String,
        default: moment(Date.now()).format('DD-MM-YYYY hh:mm:ss A')
    },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('place', place);
