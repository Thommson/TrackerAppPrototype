const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');
/*
router.get('/', (req, res) => {
  sql.connect(con, function(err) {
    const dbrequest = new sql.Request();
    dbrequest.query('select * from profile', function(err, data) {
      if (err) {
        console.log(err);
        sql.close();
        return;
      };
      res.send(JSON.stringify(data.recordset));
      sql.close();
    });
  });
});
*/
router.post('/', async (req, res) => {
  const schema = {
    profileName: Joi.string().min(2).max(255).required(),
    profilePassword: Joi.string().min(2).max(255).required()
  };

  const {error} = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  try{
    const pool = await sql.connect(con);
    const result = await pool.request()
      .input('profileName', sql.NVarChar, req.body.profileName)
      .query('Select * from profile where profileName = @profileName');
    const profile = result.recordset[0];
    if(!profile) throw 'Username or Password is invalid';

    const invalidPassword = profile.profilePassword.localeCompare(req.body.profilePassword);
    if(invalidPassword) throw 'Username or Password is invalid';

    const token = jwt.sign({"profileID": profile.profileID}, config.get('jwtPrivateKey'));

    res.send(token);
  }catch (err){
    res.status(400).send(`${err}`);
  }
  sql.close();
});

module.exports = router;
