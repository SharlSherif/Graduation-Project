const CRUD = require('../helpers/crud')
const User = require('../models/user.model')
const Place = require('../models/place.model')
const statusTypes = require('../helpers/statusTypes.json')

class UserController {
    static async getData(req, res) {
        await CRUD.getData(User, false) // autopopulate off
            .then(async response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async getOne(req, res) {
        let id = req.params.id;

        await CRUD.getOne(User, false, { _id: id }) // autopopulate off
            .then(async response => {
                if (!response.success) {
                    return res.status(404).send(response)
                }

                return res.status(200).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async profileDetails(req, res) {
        try {
            let userResponse = await CRUD.getOne(User, 'placesFK', { _id: req.user._id })
            let rentalRequests = userResponse.data.placesFK
            let userConfirmedRentalsResponse = await CRUD.getData(Place, true, { renters: req.user._id })
            let confirmedRentals = userConfirmedRentalsResponse.data
            res.status(200).send({ confirmedRentals, rentalRequests })
        } catch (e) {
            res.status(400).send(e)
        }
    }

    static async applyToBeSeller(req, res) {
        let address = req.body.address;
        let socialLink = req.body.socialLink

        await CRUD.updateOne(User, { _id: req.user._id }, { $set: { socialLink, address, status: statusTypes[1] } }, { new: true })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async update(req, res) {
        await CRUD.updateOne(User, { _id: req.params.id }, { $set: req.body })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }


    static async rentalRequest(req, res) {
        let placeID = req.params.id
        let renterID = req.user._id // current user id
        let place = await CRUD.getOne(Place, false, { _id: placeID })
        // the user must not be a current renter or has sent a rental request before
        if (
            !!place.data
            && place.data.renters.indexOf(renterID) == -1
            && place.data.rentalRequests.indexOf(renterID) == -1
        ) {
            await CRUD.updateOne(Place, { _id: placeID }, { $push: { rentalRequests: req.user._id } })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
        }else {
            res.status(403).send({success:false, data:{}, message:"User has already sent a rental request or has already rented this place"})
        }
    }

    static async delete(req, res) {
        await CRUD.delete(User, { _id: req.params.id })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}

module.exports = UserController