var express = require("express");
var path = require("path");
var sha1 = require("sha1");
var session = require("express-session");
var User = require("../models/users");
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
			secret : sha1("balkam-session-key"), 
			saveUninitialized: false, 
			resave: true 
		}))
	},
	checkLogin : function(app){
		app.use(BASE + "/*", function(req,res,next){
			if(!req.session.admin){
				return res.status(401).sendFile(path.join(__dirname, "assets", "login", "login.html"));
			}

			next();
		});
	},
	login : function(app){
		app.post(BASE + "/login", function(req,res){

			if(req.session.admin){
				return res.status(400).json("Already logged in");
			}

			User.findOne({
				username : req.body.username
			}, function (err, user) {
				if(!user){
					return res.status(401).send("Невалидни данни !")
				}

				if(!passwordHash.verify(req.body.pass, user.password)){
					return res.status(401).send("Невалидни данни !")
				}

				if(user.active == false){
					return res.status(401).send("Потребителя е неактивен !")
				}

				req.session.admin = {
					username : user.username,
					position : user.position
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
		app.use(BASE + "/rest/users"	, require("./routes/userEndpoint"));
		app.use(BASE + "/rest/product"	, require("./routes/productEndpoint"));
		app.use(BASE + "/rest/category" , require("./routes/categoryEndpoint"));
		app.use(BASE + "/rest/media"	, require("./routes/mediaEndpoint"));
		app.use(BASE + "/rest/upload"	, require("./routes/uploadFileEndpoint"));
		app.use(BASE + "/rest/contact"	, require("./routes/contactEndpoint"));
		app.use(BASE + "/rest/article"  , require("./routes/articleEndpoint"));
	},
	checkUser : function (){
		User.findOne({username: 'admin'}).exec(function(err,user) {
			if(!user){
				var hashedPass = passwordHash.generate('123456');
				var adminUser = {
					username  : 'admin',
					firstname : 'admin',
					lastname  : 'admin',
					position  : 'admin',
					password  : hashedPass,
					active    : true
				};
				User.create(adminUser,function(err) {
					if(err){
						console.log(err)
					}
					console.log("User was created")
				});
			}
		});
	},
	init : function(app){
		this.session(app);
		this.login(app);
		this.checkLogin(app);
		this.logout(app);
		this.static(app);
		this.routes(app);
		this.checkUser(app);

		app.get(BASE + "/*", function(req,res){
			res.sendFile(path.join(__dirname, "public","api", "index", "index.html"));
		});
	}
}