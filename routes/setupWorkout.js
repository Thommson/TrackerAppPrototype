const auth = require('../middleware/auth');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');

router.get('/', (req, res) => {
  sql.connect(con, function(err) {
    const dbrequest = new sql.Request();
    dbrequest.query('select * from trackables', function(err, data) {
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

router.put('/', auth, async (req, res) => {
  try{
    const pool = await sql.connect(con);
    const user = await pool.request()
      .input('workoutDays', sql.Int , req.body.workoutDays)
      .query(`update trackables set workoutDays = @workoutDays where FK_profileID = ${req.user.profileID}`);
    res.send(JSON.stringify(user.recordset));
  }catch (err){
    res.status(400).send(`${err}`);
  }
  sql.close();
});
module.exports = router;
