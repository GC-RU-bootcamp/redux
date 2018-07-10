// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
var moment = require("moment");

//Store operations
var Sequelize = require('sequelize');
var Op = Sequelize.Op



// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/XXXX", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/sessions");
    }
    res.sendFile(path.join(__dirname, ".client/build/index.html"));
  
  });

  // project 2 code
  // app.get("/", function (req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     return res.redirect("/all-sessions");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/html/index.html"));
  // });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/all-sessions");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/all-sessions");
    }
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  app.get("/join-session/:uuid", function (req, res) {
    // If the user already has an account send them to the members page
    var uuid = req.params.uuid;

    // if (req.user) {
    //   return res.redirect("/all-sessions");
    // }
    res.sendFile(path.join(__dirname, "../public/html/session.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/all-sessions", isAuthenticated, function (req, res) {
    console.log("req======================");
    console.log('app.get("/all-sessions" req.body:', req.body);
    console.log('app.get("/all-sessions" req.user:', req.user);
    console.log("res======================");
    console.log('app.get("/all-sessions" res:', res);
    console.log("end res======================");

    db.sessions.findAll({
      where: {
        item_date: {
          [Op.gte]: moment()
        }
      },
     // order: ["item_date", "DESC"],
      order: [[ 'item_date', 'ASC']],
      include: [{
        model: db.People,
        required: true,
        // include: [{
        //     model: db.people_session,
        //     required: false,
        //   //   where: {
        //   //     session_id: this.id
        //   //   }
        //   }],
      }],
      // include: [{
      //   model: db.people_session,
      //   required: false,
      //   where: {
      //     session_id: this.id
      //   }
      // }],

    }).then(function (result) {
     // console.log("result ======================");
      for (let i = 0; i < result.length; i++) {
        const row = result[i];
      //  console.log(i);
       // console.log(row);
        //let row = row.dataValues;
        let myDate = moment(row.item_date).format("MMMM Do YYYY, h:mm a");
        row.dateFormated = myDate;
      //  console.log(row.dateFormated);
        // data.session_date = 
      }

    //  console.log("END result ======================");
      var sessions = {
        title: "all-sessions",
        fullname: req.user.fst_nam + " " + req.user.lst_nam,
        isHost: req.user.role === 'host' ? true : false,
        loginInfo: {
          logon_id: req.user.logon_id,
          firstName: req.user.fst_nam,
          lastName: req.user.lst_nam,
          role: req.user.role,
          photo: req.user.photo,
          user_id: req.user.id,
        },
        sessions: result,
      };
      console.log("sessions ======================");
     // console.log(sessions);
     // console.log("END result ======================");

      //res.render('all-sessions', sessions); // project 2
      res.json(sessions);
    });
  });

  app.get("/create-session", function(req,res){
    res.sendFile(path.join(__dirname, "../public/html/createSession.html"));
  });
};