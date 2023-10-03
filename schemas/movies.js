import zod from 'zod'

const movieSchema = zod.object({
  name: zod.string({
    invalid_type_error: 'Movie name must be a string',
    required_error: 'Movie name is required'
  }),
  author: zod.string({
    invalid_type_error: 'The author must be a string',
    required_error: 'Author is required'
  }),
  year: zod.number().int().positive().min(1900).max(2024),
  rate: zod.number().min(0).max(10),
  poster: zod.string().url({
    message: 'Poster must be a valid URL'
  }),
  genres: zod.array(zod.enum(['Action', 'Adventure', 'Drama', 'Fantasy', 'Terror', 'Thriller', 'Sci-Fi', 'Crime']))
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
