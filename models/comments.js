module.exports = function(sequelize, DataTypes){
  var Comment = sequelize.define('Comment', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false
    },
      userID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postID:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment:{
        type: DataTypes.STRING,
        allowNull: false
      }
  });
  return Comment;
}
