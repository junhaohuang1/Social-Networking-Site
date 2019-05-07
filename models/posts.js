module.exports = function(sequelize, DataTypes){
  var Post = sequelize.define('Post', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    textbody:{
      type: DataTypes.STRING,
      allowNull: false
    },
    country:{
      type: DataTypes.STRING,
      allowNull: false
    },
    region:{
      type: DataTypes.STRING,
      allowNull: false
    },
    path:{
      type:DataTypes.STRING
    },
    mimetype:{
      type:DataTypes.STRING
    }
  });
  return Post;
}
