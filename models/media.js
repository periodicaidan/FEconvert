module.exports = function(sequelize, DataTypes) {
  var Media = sequelize.define("Media", {
    mediaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    mediaLink: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Media.associate = function(models) {
    // We're saying that a Media should belong to an User
    // A Media can't be created without an Author due to the foreign key constraint
    Media.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Media;
};