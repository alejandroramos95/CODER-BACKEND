const { AuthorModel } = require("../models/AutoresModel");
const Passport = require('passport');
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

try{
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
}catch(e){
	console.log(e);
}
Passport.use('signup', new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	mongoose.connect(process.env.MONGODB_URI);
	AuthorModel.findOne({nickname: username}, (err, user) => {
		if(err){
			console.log('Error con el registro '+err);
			return done(err);
		}if(user){
			console.log('Usuario ya existe');
			return done(null, false);
		}
		const newUser = {
			nickname: username,
			password: password,
			email: req.body.email,
			name: req.body.nickname,
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
}
));

Passport.serializeUser((user, done) =>{
	done(null, user._id);
});
Passport.deserializeUser((id, done) =>{
	mongoose.connect(process.env.MONGODB_URI);
	AuthorModel.findById(id, done);
});

function loadDataUser(req, DataUser) {
    req.session.username = DataUser.nickname;
    req.session.password = DataUser.password;
    req.session.email = DataUser.email;
    req.session.name = DataUser.name;
    req.session.last_name = DataUser.last_name;
    req.session.age = DataUser.age;
    req.session.nickname = DataUser.nickname;
    req.session.avatar = DataUser.avatar;
    req.session.UID = DataUser._id;
}