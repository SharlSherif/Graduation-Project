const CRUD = require('../helpers/crud')
const Place = require('../models/place.model')
const User = require('../models/user.model')

class PlaceController {
    static async getData(req, res) {
        await CRUD.getData(Place, false) // autopopulate off
            .then(async response => {
                res.status(201).send(response)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    }

    static async getOne(req, res) {
        let id = req.params.id;

        await CRUD.getOne(Place, false, { _id: id }) // autopopulate off
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

    static async create(req, res) {
        await CRUD.create(req.body, Place)
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async confirmRental(req, res) {
        console.log(req.body)
        let { placeID, userID } = req.body;
        await CRUD.updateOne(Place, { _id: placeID }, { $push: { renters: userID }, $inc: { 'residents.current': 1 } })
            .then(async response => {
                await CRUD.updateOne(User, { _id: userID }, { $pull: { placesFK: placeID } })
                    .then(async secondResponse => {
                        res.status(201).send(response)
                    })
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async update(req, res) {
        await CRUD.updateOne(Place, { _id: req.params.id }, { $set: req.body })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async delete(req, res) {
        await CRUD.delete(Place, { _id: req.params.id })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}

module.exports = PlaceController