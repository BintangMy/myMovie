const { Movie } = require("../models")

class MovieController {
  static async getMovie(req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json({ results: movies })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { MovieController }
