const User = require("../models/user");

module.exports.RenderRegisterForm = (req, res) => {
    res.render("users/register");
  }

module.exports.registerUser =  async (req, res) => {
    try
    {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const regisUser = await User.register(user, password);
        req.login(regisUser, err=>{
            if(err) return next(err);
            req.flash("success", "Welcome to CampGs");
            res.redirect("/campgrounds");
        });
    }
    catch(e){
        const {email} = req.body;
        const emailExists = await User.findOne({email});
        let mesg = e.message;

        if(emailExists)
        {
            mesg = "The email inputted is already being used"
        }

        req.flash('error', mesg);
        res.redirect('register');
    }
  }


module.exports.renderLoginForm = (req, res)=>{
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
    req.logout(err =>{
        if(err) return next(err);
    });
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}