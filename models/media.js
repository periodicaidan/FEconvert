module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
     id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    videoname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    videolink: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The uuid userlink cannot be null
    userlink: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  });
  return User;
};