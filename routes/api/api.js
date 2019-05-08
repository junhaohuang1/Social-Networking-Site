const express = require('express');
var db = require("../../models");
const url = require('url');
var multer  = require('multer')
const path = require('path');

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
    mimetype:req.body.filetype
  }).then(function(newPost, created){
    res.status(200);
    res.end();
  })
});






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



router.post('/addfriend', (req, res, next) =>{
  console.log('adding friend');
  // need to add a check for if friends already
  db.friendlist.create({
    userOneID: req.header.userOneID,
    userTwoID: req.header.userTwoID
  }).then(function(newFriendRelation, created){
    console.log('friend added');
    res.status(200);
    res.end();
  })
})



router.get('/findfriend', (req, res, next) => {
  console.log("at findfriend api");
  // console.log('req.headers.email);
  db.User.findOne({
    where:{
      email:req.headers.email
    }
  }).then(function(dbUser){
      if (!dbUser) {
        console.log('couldnt find user');
        // return res.status(401).redirect(url.format({
        //   pathname:'/api/friendsearchresult',
        //   query:{
        //     "success": false,
        //     "errorMessage": 'user not found'
        //     }
        //   }));
        // return res.status(401).json({
        //   success:false,
        //   errors:{
        //     message:"user not found"
        //   }
        // });
        const errors = {
          message:"User not found"
        }
        res.status(400);
        res.send(errors);
        // res.status(400).redirect(url.format({
        //   pathname:'/api/friendsearchresult',
        //   query:{
        //     "success": false,
        //     "errorMessage": 'user not found'
        //     }
        // }));
        // console.log(res);
        res.end();
      } else {
        console.log('found user');
        const result = {
          success: true,
          userId:dbUser.id,
          name:dbUser.name,
          email:dbUser.email
        }
        // console.log('sending redirect');
        // res.status(200).redirect(url.format({
        //   pathname:'/api/friendsearchresult',
        //   query:result
        // }));
        // console.log('sending status');
        // res.status(200).json({
        //   result: result
        // });
        res.status(200);
        res.send(result);
        res.end();
      }
      // return res.status(200).redirect(url.format({
      //   pathname:'/api/friendsearchresult',
      //   query:{
      //     "success": true,
      //     "userId": dbUser.id,
      //     "username": dbUser.name,
      //     "email": dbUser.email
      //     }
      //   }));
        // return res.json({
        //   success: true,
        //   result:{
        //     userId: dbUser.id,
        //     username: dbUser.name,
        //     email: dbUser.email
        //     }
        // })
    })
})

// router.get('/friendsearchresult', (req, res, next) => {
//   console.log(req.query);
//   res.send(req.query.userId);
//   res.end();
// })


module.exports = router;
