const { AuthorModel } = require("../models/AutoresModel");
const { TwitterAuthorModel } = require('../models/TwitterModel');
const Passport = require('passport');
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

Passport.use('login', 
	new LocalStrategy(
		(username, password, done) => {
			console.log(username + '<--DATOS-->' + password);
			mongoose.connect(process.env.MONGODB_URI);
			AuthorModel.findOne({nickname: username}, (err, user) => {
				if(err)return done(err);
				if(!user){
					console.log('Usuario no encontrado '+username);
					return done(null, false);
				}if(user.password!=password){
					console.log('Contraseña invalida');
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);

Passport.use('signup', new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	mongoose.connect(process.env.MONGODB_URI);
	AuthorModel.findOne({email: req.body.email}, (error, mail) => {
		if(error){
			console.log('Error con el registro '+error);
			return done(err);
		}if(mail){
			console.log('Email ya registrado');
			return done(null, false);
		}
		AuthorModel.findOne({nickname: username}, (err, user) => {
		if(err){
			console.log('Error con el registro '+err);
			return done(err);
		}if(user){
			console.log('Nombre de usuario ya existe');
			return done(null, false);
		}
		const newUser = {
			nickname: username,
			password: password,
			email: req.body.email,
			name: req.body.name,
			last_name: req.body.last_name,
            age: req.body.age,
            avatar: req.body.avatar
		};
		AuthorModel.create(newUser, (err, userWithID)=>{
			if(err){
				console.log('Error al guardar el usuario: '+err);
				return done(err);
			}
			console.log(user);
			console.log('Registro de usuario completo');
			return done(null, userWithID);
		});
	})
	});
	
}
));

Passport.use(new TwitterStrategy({
	consumerKey:process.env.TWITTER_COSUMER_KEY,
	consumerSecret:process.env.TWITTER_COSUMER_SECRET,
	callbackURL: process.env.CALLBACK_URL
}, function(token, tokenSecret, profile, done){
	console.log(profile);
	mongoose.connect(process.env.MONGODB_URI);
	TwitterAuthorModel.findOrCreate({twitter_id: Number(profile.id), avatar: profile._json.profile_image_url_https}, function(err, user){
		if(err){return done(err)}
		done(null, user);
	});
}));

Passport.serializeUser((user, done) =>{
	done(null, user._id);
});
Passport.deserializeUser((id, done) =>{
	mongoose.connect(process.env.MONGODB_URI);
	AuthorModel.findById(id, done);
});
