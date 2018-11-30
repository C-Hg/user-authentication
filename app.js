const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user.model');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authFunctions = require('./controllers/functions/auth.functions');
const dbFunctions = require('./controllers/functions/database.functions');
require('dotenv').config();

// app setup
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ optionSuccessStatus: 200 }));

//Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/user-authentication", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//Get the default connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Connected to database");
    //configuring the listening port
    const listener = app.listen(process.env.PORT || 3000, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });
});

//authentication middlewares
passport.use(new LocalStrategy(
    async function (username, password, done) {
        //checks that user exists
        let user = await dbFunctions.check_user_by_username(username);
        if (!user) { return done(null, false); }

        //checks that password matches with registered hash
        let match = await authFunctions.verifyPassword(password, user.password);
        if (!match) { return done(null, false); }
        return done(null, user);
    }
))

passport.serializeUser(function (user, done) {

    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    await User.findById(id, function (err, user) {
        if (err) return err;
        done(null, user);
    });
});

//controls cookies after auth middlewares
app.use(authFunctions.cookieSetter); 

//home routing
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//loading route files
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')

app.use("/auth", authRoutes);
app.use('/user', userRoutes);

//404 errors
app.use((req, res, next) => {
    res.status(404)
        .type('text')
        .send('Not Found');
});
