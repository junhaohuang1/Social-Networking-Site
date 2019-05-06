module.exports = function(sequelize, DataTypes){
  var Like = sequelize.define('Like', {
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Like;
}
