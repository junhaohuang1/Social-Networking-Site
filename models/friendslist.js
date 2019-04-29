module.exports = function(sequelize, DataTypes){
  var friendslist = sequelize.define('Friendslist', {
    timestamps:true,
    id:{
      type: DataTypes.INTEGER, // All dataTypes format available here http://bit.ly/2ofwgAm
      primaryKey: true,
      autoIncrement: true
    },
    userOneID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userTwoID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateEstablished:{
      type:DataTypes.DATE
    }
  });
  return friendslist;
}
