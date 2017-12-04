const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');

const User = mongoose.model('User');
const { catchErrors } = require('./helpers/');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const projectsController = require('./controllers/projectsController');
const tasksController = require('./controllers/tasksController');
const timelogController = require('./controllers/timelogController');

// passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();
const staticAssetsPath = path.resolve(__dirname, 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(staticAssetsPath));
app.use(expressValidator());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.get('/auth', authController.getClientAUser);

app.get('/logout', authController.logout);

app.post(
  '/signup',
  userController.validateSignup,
  catchErrors(userController.signup),
  passport.authenticate('local'),
  authController.login
);

app.post('/login', passport.authenticate('local'), authController.login);

app.post('/projects/add', catchErrors(projectsController.add));
app.get('/projects/getProjects', catchErrors(projectsController.getProjects));
app.post('/projects/delete', projectsController.deleteProject);
app.post('/projects/:id/edit', catchErrors(projectsController.update));

app.get('/projects/:id/getTasks', catchErrors(tasksController.getTasks));
app.post('/projects/:id/add', catchErrors(tasksController.newTask));
app.post('/projects/:id/delete', tasksController.deleteTask);
app.post('/projects/tasks/:id/edit', catchErrors(tasksController.renameTask));
app.post('/projects/tasks/:id/done', catchErrors(tasksController.toggleDone));

app.post('/projects/timelog', catchErrors(timelogController.addTime));
app.get('/projects/getlogs/:page', catchErrors(timelogController.getLogs));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;
