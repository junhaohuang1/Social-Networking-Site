module.exports = function(sequelize, DataTypes){
  var Dislike = sequelize.define('Dislike', {
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Dislike;
}
