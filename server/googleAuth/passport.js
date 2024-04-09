const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("../models/user");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			console.log(accessToken,'token access #############################',profile,'profile&&&&&&&&&&&&&&&&&')
			const user = await User.findOne({email : profile.emails[0].value})
			if(!user){
				const userData = new User({
					email:profile.emails[0].value ,
                    googleId: profile.id,
                    firstname:profile.name.familyName,
                    lastname:profile.name.givenName,
				})
				await userData.save();
				return callback(null, profile);
			}
			return callback(null, profile);
			
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

