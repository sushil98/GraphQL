'use strict';
module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define('Director', {
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    country: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {});
  Director.associate = function(models) {
    // associations can be defined here
    Director.belongsTo(models.Actor, { foreignKey: 'actorId' })
  };
  return Director;
};