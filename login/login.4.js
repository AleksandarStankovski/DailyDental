var express = require("express");
var path = require("path");
var sha1 = require("sha1");
var session = require("express-session");
var User = require("../models/user");
var passwordHash = require('password-hash');
var multer = require('multer');
var BASE = "/administration";

module.exports = {
	session : function(app){
		app.use(BASE, session({ 
			cookie: { 
				maxAge: 10600000, 
				secure: false, 
				httpOnly: true 
			}, 
			rolling : true, 
			secret : sha1("nat2010-session-key"), 
			saveUninitialized: false, 
			resave: true 
		}))
	},
	checkLogin : function(app){
		app.use(BASE + "/*", function(req,res,next){
			if(!req.session.admin){
				return res.status(401).sendFile(path.join(__dirname, "assets", "login", "login.html"))
			}

			next();
		});
	},
	login : function(app){
		app.post(BASE + "/login", function(req,res){

			if(req.session.admin){
				return res.status(400).json("Already logged in");
			}
			console.log(passwordHash.generate("123456"))
			User.findOne({
				username : req.body.userName
			}, function (err, user) {
				if(!user){
					return res.status(401).json("Invalid credentials")
				}

				if(!passwordHash.verify(req.body.password, user.password)){
					return res.status(401).json("Invalid credentials")
				}

				req.session.admin = {
					userName : user.username
				}

				req.session.save(function(){
					res.redirect(BASE)
				});

			});

		});
	},
	logout : function(app) {
		app.get(BASE + "/logout",function(req,res) {
			req.session.destroy();
  			res.redirect('/');
		});
	},
	static : function(app){
		app.use(BASE,express.static(path.join(__dirname,"public")));
	},
	routes : function(app) {
		app.use(BASE + "/rest/users", require("./routes/userEndpoint"));
		app.use(BASE + "/rest/news",require("./routes/newsEndpoint"));
		app.use(BASE + "/rest/gallery",require("./routes/galleryEndpoint"));
		app.use(BASE + "/rest/interview",require("./routes/interviewEndpoint"));
		app.use(BASE + "/rest/document",require("./routes/documentEndpoint"));
		app.use(BASE + "/rest/upload",require("./routes/uploadEndpoint"));

	},
	init : function(app){
		this.session(app);
		this.login(app);
		this.checkLogin(app);
		this.logout(app);
		this.static(app);
		this.routes(app);

		app.get(BASE + "/*", function(req,res){
			res.sendFile(path.join(__dirname, "public","api", "index", "index.html"));
		});
	}
}