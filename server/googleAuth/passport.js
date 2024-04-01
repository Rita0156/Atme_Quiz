const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
console.log(process.env.CLIENT_ID,'env&&&&&&&&&********************&&&&&&&&&&&&&&&&&&&')
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			console.log(accessToken,'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',refreshToken)
			callback(null, profile);


         /////////////////////////////////////////////////////////////////

		 User.findOne({ email: profile.emails[0].value }, (err, user) => {
			if (err) {
			  callback(err); // handle errors!
			}
			if (!err && user !== null) {
			  callback(err, user);
			}
			else {
	  
			  user = new User({
				googleId: profile.id,
				email: profile.emails[0].value,
				firstname: profile.name.givenName,
				lastname: profile.name.familyName,
				role: role.Client,
				isActive: true,
				isGain: false,
			  });
	  
			  user.save((err) => {
				if (err) {
				  callback(err); // handle errors!
				} else {
				  callback(null, user);
				}
			  });
			}
		})

		 /////////////////////////////////////////////////////



		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});