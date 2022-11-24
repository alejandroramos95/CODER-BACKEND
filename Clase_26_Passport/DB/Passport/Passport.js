const { AuthorModel } = require("../models/AutoresModel");
const Passport = require('passport');
const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

try{
	Passport.use('login', 
		new LocalStrategy(
			(email, password, done) => {
				console.log(email + '<--DATOS-->' + password);
				mongoose.connect(process.env.MONGODB_URI);
				AuthorModel.findOne({email: email}, (err, user) => {
					if(err)return done(err);
					if(!user){
						console.log('Usuario no encontrado '+email);
						return done(null, false);
					}if(!isValidPassword(user, password)){
						console.log('Contraseña invalida');
						return done(null, false);
					}
					return done(null, user);
				});
			}
		)
	);
}catch(e){
	console.log(e);
}
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
			password: createHash(password),
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

Passport.serializeUser((user, done) =>{
	done(null, user._id);
});
Passport.deserializeUser((id, done) =>{
	mongoose.connect(process.env.MONGODB_URI);
	AuthorModel.findById(id, done);
});

function isValidPassword(user, password){
	return bCrypt.compareSync(password, user.password);
}

function createHash(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}