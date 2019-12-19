const { User, Movie,Actor,Director } = require('../models')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const randomstring = require("randomstring");
require('dotenv').config()

const resolvers = {

  NonAuthenticate:{
     movies: () => Movie.findAll({}),
  },
  AllMoviesWithoutAuthorized:{
    actors: (Movie, {}) =>  Actor.findAll({where:{movieId:Movie.id,}}), 
  },
  AllMovies:{
    async  scoutbase_rating (root, args, { String }) {
      return randomstring.generate({
        length: 1,
        charset: 'numeric',
        
      })},
    
     actors: (Movie, {}) =>  Actor.findAll({where:{movieId:Movie.id,}}),   // tricky part to link query relation ship between User and Car
  },
 
 Actors:{

      directors:(Actor,{})=> Director.findAll({where:{actorId:Actor.id,}}),
      movieId: (Actor, {}) => Movie.findAll({id: Actor.movieId }),  // tricky part to link query relation ship between User and Car
},

  Query: {

    async allUsers (root, args, { user }) {
      return User.all()
    },
      nonAuthenticate:()=>Movie.findAll({}),
      movies: () => Movie.findAll({}),
      directors:() =>Director.findAll({}),
      movie:(_, { id }) => Movie.findById(id),
      actor:(_,{id}) => Actor.findById(id),
      actors:() => Actor.findAll({}),
  
  },

  Mutation: {
   
    async addMovie (root, { title, year, rating }) {
     
      return Movie.create({
        title,
        year,
        rating,
       
      })
    },

async addActor (root, { movieId, name, birthday, country }) {
  
  return Actor.create({
    movieId,
    name,
    birthday,
    country,
  })
},

async addDirector (root, { actorId, name, birthday, country }) {
  return Director.create({
    actorId,
    name,
    birthday,
    country,
  })

},

    async Signup (root, { username, email, password,is_admin }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        is_admin: is_admin
      })

      return {"user":user,
      "token": jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )}
    },

    async login (root, { email, password }) {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }
      return {"user":user,
      "token": jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )}
    },
  },

}
module.exports = resolvers