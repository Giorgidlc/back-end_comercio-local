import { randomUUID } from 'node:crypto'

import { readJSON } from '../utils.js'
const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genres }) {
    if (genres) {
      return movies.filter(
        movie => movie.genres.some(g => g.toLowerCase() === genres.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create (object) {
    const newMovie = {
      id: randomUUID(),
      ...object
    }
    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, object }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...object
    }
    return movies[movieIndex]
  }
}
