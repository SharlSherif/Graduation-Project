
const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId
const moment = require('moment')
// const UserTypes = require('../helpers/UserTypes.json')
const statusTypes = require('../helpers/statusTypes.json')

const User = mongoose.Schema({
    placesFK: [{
        type: ObjectID,
        ref: 'place'
    }],
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    // type: {
    //     type: String,
    //     enum: UserTypes,
    //     default: UserTypes[0] // employee
    // },
    isCustomer: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        // enum: statusTypes,
        default: null
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    socialLink: {
        type: String,
        default: null
    },
    createdAt: {
        type: String,
        default: moment(Date.now()).format('DD-MM-YYYY hh:mm:ss A')
    },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', User);