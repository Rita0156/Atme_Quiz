const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken')
const Secrete = process.env.SECREATE_KEY
router.get("/login/success", (req, res) => {
	console.log(req,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',req.user,'&&&&&&&&&&&&&&&&&&&&&&&&')
	if (req.user) {
		const token=jwt.sign(req.user.id,Secrete)
		console.log(token,'%%%%%%%%%%%%%%%%%%%%%%%%%%')
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
			token
		});
		
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
		err : "Error when login failed"
	});
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//     "/google/callback",
//     passport.authenticate('google', { failureRedirect: '/login/failed' }),
//     (req, res) => {
        
//         res.redirect('http://localhost:3000');
//     }
// );
console.log(process.env.CLIENT_URL,'client side url')
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('http://localhost:3000');
	  })
});

module.exports = router;