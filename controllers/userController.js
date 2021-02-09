const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Rental.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Rental.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Rental.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Rental.findOneAndUpdate(
      { _id: req.params.id } || { location: req.params.location },
      { $set: {
        imageUrl: req.body.imageUrl,
        homeImage: req.body.homeImage,
        employee: req.body.employee,
        cleaning: req.body.cleaning,
        description: req.body.description,
        activities: req.body.activities,
        link: req.body.link,
        location: req.body.location,
        descriptionSpan: req.body.descriptionSpan,
        activitiesSpan: req.body.activitiesSpan,
        bedCount: req.body.bedCount,
        bathCount: req.body.bathCount
       } },
      { new: true }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Rental.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllByName: function (req, res) {
    db.Rental.find({ location: req.params.location })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
