const db = require("../models");
const movie = db.movies;

// Create and Save a new movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a movie
  const movie = new movie({
    id: req.body.id,
    title: req.body.title,
    release: req.body.release ? req.body.release : false,
  });

  // Save movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the movie.",
      });
    });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  let condition = id
    ? { id: { $regex: new RegExp(id), $options: "i" } }
    : {};
  movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies.",
      });
    });
};
// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete movie with id=${id}. Maybe movie was not found!`,
        });
      } else {
        res.send({
          message: "movie was deleted successfully!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete movie with id=" + id,
      });
    });
};
// Delete all movies from the database.
exports.deleteAll = (req, res) => {
  movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} movies were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies.",
      });
    });
};