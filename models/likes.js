module.exports = function(sequelize, DataTypes){
  var Likes = sequelize.define('Likes', {
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Likes;
}
