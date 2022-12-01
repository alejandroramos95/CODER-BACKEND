const Passport = require('passport');
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { AuthorModel } = require("../models/AutoresModel");
const { TwitterAuthorModel } = require('../models/TwitterModel');
const { GitHubAuthorModel } = require('../models/GitHubModel');
const { GoogleAuthorModel } = require('../models/GoogleModel');

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
            avatar: req.body.avatar,
			linked_account: "local"
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
/* TWITTER STRATEGY */
Passport.use(new TwitterStrategy({
	consumerKey: process.env.TWITTER_COSUMER_KEY,
	consumerSecret: process.env.TWITTER_COSUMER_SECRET,
	callbackURL: process.env.TWITTER_CALLBACK_URL
}, function(token, tokenSecret, profile, done){
	mongoose.connect(process.env.MONGODB_URI);
	TwitterAuthorModel.findOrCreate({
		_id: Number(profile.id), 
		avatar: profile._json.profile_image_url_https, 
		nickname: profile._json.name,
		linked_account: "Twitter"
	}, function(err, user){
		if(err){return done(err)}
		done(null, user);
	});
}));
/* GITHUB STRATEGY */
Passport.use(new GitHubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done){
	mongoose.connect(process.env.MONGODB_URI);
	const [first, second, middle, last] = profile._json.name.split(' ');
	GitHubAuthorModel.findOrCreate({
		_id: profile._json.id, 
		avatar: profile._json.avatar_url, 
		nickname: profile._json.login,
		name: first+' '+second,
		last_name: middle+' '+last,
		linked_account: "GitHub"
	}, function(err, user){
		if(err){return done(err)}
		done(null, user);
	});
}));
/* GOOGLE STRATEGY */
Passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done){
	mongoose.connect(process.env.MONGODB_URI);
	/* SE TIENE QUE BUSCAR SOLO POR ID */
	GoogleAuthorModel.findOrCreate({
		_id: profile._json.sub, 
		avatar: profile._json.picture, 
		nickname: profile._json.login,
		name: profile._json.given_name,
		last_name: profile._json.family_name,
		linked_account: "Google",
		email: profile._json.email,
	}, function(err, user){
		if(err){return done(err)}
		done(null, user);
	});
}));
/* SERIALIZE AND DESERIALIZE */
Passport.serializeUser((user, done) =>{
	done(null, {id: user._id, linked_account: user.linked_account});
});
Passport.deserializeUser((user_data, done) =>{
	mongoose.connect(process.env.MONGODB_URI);
	if(user_data.linked_account === 'Twitter'){
		TwitterAuthorModel.findById(user_data.id, done);
	}else if(user_data.linked_account === 'GitHub'){
		GitHubAuthorModel.findById(user_data.id, done);
	}else if(user_data.linked_account === 'Google'){
		GoogleAuthorModel.findById(user_data.id, done);
	}else{
		AuthorModel.findById(user_data.id, done);
	}
});
