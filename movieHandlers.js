const database = require("./database");

const getMovies = (req, res) => {
    let sql = "select * from movies";
    const sqlValue = [];

    if(req.query.color != null) {
      sql += " where color = ?";
      sqlValue.push(req.query.color);

      if(req.query.max_duration != null) {
        sql += " and duration <= ?";
        sqlValue.push(req.query.max_duration);
      }
    } else if(req.query.max_duration != null) {
      sql += " where duration <= ?";
      sqlValue.push(req.query.max_duration);
    }
    database
      .query(sql, sqlValue)
      .then(([movies]) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
      });
  };
  
  const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database 
      .query("select * from movies where id = ?", [id])
      .then(([movies]) => {
        if (movies[0] !== null) {
          res.status(200).json(movies[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  };

  const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;

    database
        .query(
            "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
            [title, director, year, color, duration]
        )
        .then(([result]) => {
            res.location(`/api/movies/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving the movie')
        })
  };

  const updateMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;

    database
      .query(
      "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id])
      .then(([result]) => {
        if(result.affectedRows === 0) {
          res.status(404).send('Not Found');
        } else {
          res.sendStatus(204);
        };
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error editing the movie')
      })

  }

  const deleteMovieById = (req, res) => {
    const id = parseInt(req.params.id);

    database
      .query("DELETE FROM movies WHERE id= ?", [id])
      .then(([result]) => {
        if(result.affectedRows === 0) {
          res.status(404).send('Not Found');
        } else {
          res.sendStatus(200)
        };
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error deleting the movie');
      })
  }
  
  module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    updateMovieById,
    deleteMovieById
  }