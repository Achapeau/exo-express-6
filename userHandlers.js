const database = require("./database")

const getUsers = (req, res) => {
  let sql = "select * from users";
    const sqlValue = [];

    if(req.query.language != null) {
      sql += " where language = ?";
      sqlValue.push(req.query.language);

      if(req.query.city != null) {
        sql += " and city = ?";
        sqlValue.push(req.query.city);
      }
    } else if(req.query.city != null) {
      sql += " where city = ?";
      sqlValue.push(req.query.city);

      if(req.query.language != null) {
        sql +=" and language = ?";
        sqlValue.push(req.query.language);
      }
    }
  database
    .query(sql, sqlValue)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES ( ?, ?, ?, ?, ?)", 
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the user')
  })
}

const updateUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
    [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if(result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      };
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing the user')
    })

};

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id= ?", [id])
    .then(([result]) => {
      if(result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(200)
      };
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting the user');
    })
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUserById,
  deleteUserById
};
