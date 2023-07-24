require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite user list");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");
const movieHandlers = require('./movieHandlers');
const { validateMovie } = require('./validator')
const { validateUser } = require('./validator')

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);

app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.post('/api/users', validateUser, userHandlers.postUser);

app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovieById);
app.put('/api/users/:id', validateUser, userHandlers.updateUserById);

app.delete('/api/movies/:id', movieHandlers.deleteMovieById);
app.delete('/api/users/:id', userHandlers.deleteUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
