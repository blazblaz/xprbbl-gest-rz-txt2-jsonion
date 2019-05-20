import cookies from 'cookies';
import genuuid from 'uid-safe';

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

sessionChecker.get('/signup', (req, res) => {
	console.log("signup route");
});

sessionChecker.get('/login', (req, res) => {
	console.log("signup route");
});

sessionChecker.get('/logout', (req, res) => {
	console.log("logout route");
});


export default sessionChecker;