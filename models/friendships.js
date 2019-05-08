module.exports = function(sequelize, DataTypes){
  var friendships = sequelize.define('friendships', {
    id:{
      type: DataTypes.INTEGER, // All dataTypes format available here http://bit.ly/2ofwgAm
      primaryKey: true,
      autoIncrement: true
    },
    sender_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiver_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });
  return friendships;
}
