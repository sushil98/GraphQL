'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    rating: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.Actor)
  };
  return Movie;
};