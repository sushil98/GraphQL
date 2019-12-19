'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    country: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {});
  Actor.associate = function(models) {
    // associations can be defined here
    Actor.belongsTo(models.Movie, { foreignKey: 'movieId' }),
    Actor.hasMany(models.Director)
  };
  return Actor;
};