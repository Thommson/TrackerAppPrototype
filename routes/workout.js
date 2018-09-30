const auth = require('../middleware/auth');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');

router.post('/', auth, async (req, res) => {
    var sendJSON = {
      weight: '',
      workout: ''
    };
  try{
    const pool = await sql.connect(con);
    const dataEntry = await pool.request()
    .query(`INSERT INTO dataEntry (FK_profileID) VALUES(${req.user.profileID})`);

    const FK_dataEntryID = await pool.request()
      .query('select COUNT(dataEntryID) from dataEntry');

    const weight = await pool.request()
    .input('FK_dataEntryID', sql.Int, Number(Object.values(FK_dataEntryID.recordset[0])))
    .input('currentWeight', sql.Int, req.body.currentWeight)
    .query('insert into weight (FK_dataEntryID, currentWeight) values(@FK_dataEntryID, @currentWeight)');
    sendJSON.weight = weight.recordset;

    const workout = await pool.request()
    .input('FK_dataEntryID', sql.Int, Number(Object.values(FK_dataEntryID.recordset[0])))
    .input('hadWorkout', sql.Bit , req.body.workedOut)
    .input('hadInjury', sql.Bit , req.body.gotInjured)
    .query('insert into workout (FK_dataEntryID, hadWorkout, hadInjury) values(@FK_dataEntryID, @hadWorkout, @hadInjury)');
    sendJSON.weight = workout.recordset;

    res.send(sendJSON);
  }catch (err){
    res.status(400).send(`${err}`);
  }
  sql.close();
});

module.exports = router;
