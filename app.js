const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//enables CORS (facultative)
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

// app setup
app.use(bodyParser.urlencoded({extended: false}));

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
