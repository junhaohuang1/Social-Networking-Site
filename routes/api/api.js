const express = require('express');
var db = require("../../models");
const url = require('url');
var multer  = require('multer')
const path = require('path');
const Sequelize = require('sequelize');
const op = Sequelize.Op;


const {acceptFR, sendFR, rejectFR, deleteFR, listFR} = require('./db')


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  database : '6083project'
});


connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

//Set Storage Engine

const router = new express.Router();

const storage = multer.diskStorage({
  destination: __dirname + '/uploads'
})

const upload = multer({ storage: storage })

router.use('/files/',express.static('uploads'));


router.get('/dashboard', (req, res) => {
    console.log("dashboard")
  res.status(200).json({
    message:"we are at our dashboard"
  });
});


router.post('/createpost',upload.single('file'), (req, res) => {
  console.log(req.file)
  db.Post.create({
    username:req.body.username,
    title:req.body.title,
    textbody:req.body.textbody,
    region: req.body.region,
    country:req.body.country,
    path:req.file.filename,
    mimetype:req.file.mime
  }).then(function(newPost, created){
    res.status(200);
    res.end();
  })
})






router.post('/editprofile/:userid', (req, res, next) => {
  console.log('updating info')
  db.User.update(
    {
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    region: req.body.region.label.trim(),
    country:req.body.country.label.trim(),
    birthday: req.body.birthday,
    privacy: req.body.privacy ? 1 : 0,
    interest: req.body.interest.trim()},
    {
      where:{
        id:req.params.userid
      },
      returning: true
    }
  ).then(function(rowsUpdated){
    res.status(200).json({
      rowsUpdated
    });
  }).catch(next)
});


router.get('/profile/:userid', (req, res, next) => {
  console.log('finding user');
  db.User.findOne({
    where: {
      id:req.params.userid
    }
  }).then(function(dbUser) {
    if(dbUser.dataValues.privacy === 1){
      dbUser.dataValues.privacy = true
    } else {
      dbUser.dataValues.privacy = false
    }

    res.status(200).json(dbUser);
  })
  .catch(next);
});


// app.get("/getUsersbyName", (req, res) => {
//     getUsersbyName(req.body.name).then(result => {
//         res.json({
//             users:result.rows
//         })
//     }).catch(e => {
//         console.log(e);
//     })
// })




router.post("/sendFR", (req, res) => {
    console.log("req.body.otherUserId", req.body.otherUserId);

    db.friendships.create({
      sender_id:req.body.userid,
      receiver_id:req.body.otherUserId,
      status:1
    }).then(function(newFriendship, created){
      console.log('friendship sender '+newFriendship.sender_id)
      res.json({
        success:true,
        status:1,
        receiver_id:newFriendship.receiver_id,
        sender_id:newFriendship.sender_id
      })
      res.status(200);
      res.end();
    }).catch(e=>{
      console.log(e)
    })

    //
    //
    //
    //
    // sendFR(req.body.userid, req.body.otherUserId, 1).then(result => {
    //     res.json({
    //         success: true,
    //         status: 1,
    //         receiver_id: result.rows[0].receiver_id,
    //         sender_id: result.rows[0].sender_id
    //     })
    // }).catch(e => {
    //     console.log(e);
    // })
})


router.post("/acceptFR", (req, res, next) => {
    console.log("req.body.otherUserId", req.body.otherUserId);
    console.log("req.body.userid", req.body.userid);
      db.friendships.update(
        {
          status:2
        },
        {
          where:{
            status:1,
            [op.or]: [{receiver_id: req.body.otherUserId, sender_id:req.body.userid}, {receiver_id:req.body.userid, sender_id: req.body.otherUserId}]
          },
          returning: true
        }
      ).then(function(rowsUpdated){
        db.friendships.findOne({
            where:{
              status:2,
              [op.or]: [{receiver_id: req.body.otherUserId, sender_id:req.body.userid}, {receiver_id:req.body.userid, sender_id: req.body.otherUserId}]
            }
        }).then(function(friendship){
          console.log(friendship)
          res.status(200).json({
            success:true,
            status:friendship.status,
            receiver_id:friendship.receiver_id,
            sender_id:friendship.sender_id
          })
        }).catch(e =>{
          console.log(e)
        })
      }).catch(next)
});


router.post("/rejectFR", (req, res) => {
  db.friendships.destroy(
    {
      where:{
        status:1,
        [op.or]: [{receiver_id: req.body.otherUserId, sender_id:req.body.userid}, {receiver_id:req.body.userid, sender_id: req.body.otherUserId}]
      },
      returning: true
    }).then(function(rowsUpdated){
      res.status(200).json({
        success:true,
        status:5
    })
  })
})

router.post("/deleteFR", (req, res, next) => {
  db.friendships.destroy(
    {
      where:{
        status:2,
        [op.or]: [{receiver_id: req.body.otherUserId, sender_id:req.body.userid}, {receiver_id:req.body.userid, sender_id: req.body.otherUserId}]
      },
      returning: true
  }).then(function(rowsUpdated){
      res.status(200).json({
        success:true,
        status:4
      })
  }).catch(next)
})


router.get("/listFR", (req, res) => {
    // listFR(req.session.user.id).then(result => {
    //     console.log("listFR results.rows", result.rows);
    //     res.json({
    //         success: true,
    //         users: result.rows,
    //         loggedUser: req.session.user.id
    //     })
    // }).catch(e => {
    //     console.log(e);
    // })

    console.log(req.headers.userid)
    connection.query('CALL listFR(?);',[req.headers.userid], function(error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.status(200).json({
      users:results[0]
    })
  })
})

router.get('/findfriend', (req, res, next) => {
  // console.log("at findfriend api");
  db.User.findOne({
    where:{
      username:req.headers.searchedname
    }
  }).then(function(dbUser){
      if (!dbUser) {
        console.log('couldnt find user');
        const errors = {
          message:"User not found"
        }
        res.status(400);
        res.send(errors);
        res.end();
      } else {
        console.log('found user');
        console.log(req.headers.userid);
        db.friendships.findOne({
            where:{
              [op.or]: [{receiver_id: dbUser.id, sender_id:req.headers.userid}, {receiver_id:req.headers.userid,sender_id: dbUser.id}]
            }
        }).then(function(friendship){
          console.log('not a friend yet')
          if(!friendship){
            result = {
             success: true,
             userId:dbUser.id,
             name:dbUser.username,
             firstname:dbUser.firstname,
             lastname:dbUser.lastname,
           }
           res.status(200);
           res.send(result);
           res.end();
         } else {
           console.log('found something in the friendship table')
           result = {
            success: true,
            userId:dbUser.id,
            name:dbUser.username,
            firstname:dbUser.firstname,
            lastname:dbUser.lastname,
            status:friendship.status,
            sender_id:friendship.sender_id,
            receiver_id:friendship.receiver_id
          }
          res.status(200);
          res.send(result);
          res.end();
          }
        })
      }
    })
})






module.exports = router;
