const {connection} = require('../db_connection');
const router = require('express').Router();
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    "SELECT * FROM admin WHERE username=?;", 
    username, 
    (err, result) => {
      if (err) {
        res.send({err : err});
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) =>{
          if (response) {
            const user = {name : result[0].username} ;
            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            res.json({user : user, token : token});
          } else {
            res.json({message : "Mauvaise combinaison d'identifiants"})
          }
        });
      } else {
        res.json({message : "Utilisateur inexistant"})
      }
    }
  )
});

router.post('/register', (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err){
      console.log(err)
    }
  connection.query("INSERT INTO admin (username, password) VALUES(?,?)",
  [username, hash],
  (err, result)=>{
    if(err){
      console.log(err);
      res.send({message : "Identifiants indisponible, veuillez choisir un autre identifiant."})
    }
    else {
      res.send({message : "Compte créé avec succès, vous pouvez maintenant vous connecter."})
    }
  });
  });
  });

router.put('/:id', (req, res) => {
  let sql = "UPDATE admin SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM admin WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `Admin with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM admin WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;