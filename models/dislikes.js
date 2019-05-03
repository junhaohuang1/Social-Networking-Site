module.exports = function(sequelize, DataTypes){
  var Dislikes = sequelize.define('Dislikes', {
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Dislikes;
}
