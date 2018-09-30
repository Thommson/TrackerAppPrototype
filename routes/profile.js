const auth = require('../middleware/auth');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');


router.get('/', auth, async (req, res) => {
    var sendJSON = {
      prof: '',
      sleep: '',
      weight: '',
      height: '',
      sleepSatis: '',
      targetWeight: '',
      workoutCountThisMonth: '',
      targetWorkout: '',
      waterGlasses: '',
      startWeight: ''
    };
    try{
      const pool = await sql.connect(con);

      const profile = await pool.request()
      .query(`SELECT profileName FROM profile WHERE profileID = ${req.user.profileID}`);
      sendJSON.prof = profile.recordset;
      console.log(profile);

      const sleepAVG = await pool.request()
      .query('SELECT AVG(sleepHours) FROM sleep');
      sendJSON.sleep = sleepAVG.recordset;

      const currWeight = await pool.request()
      .query('SELECT TOP 1 * FROM weight ORDER BY FK_dataEntryID DESC');
      sendJSON.weight = currWeight.recordset;

      const height = await pool.request()
      .query(`SELECT height from profile where profileID = ${req.user.profileID}`);
      sendJSON.height = height.recordset;

      const sleepQuality = await pool.request()
      .query('SELECT AVG(sleepQuality) FROM sleep');
      sendJSON.sleepSatis = sleepQuality.recordset;

      const weightGoal = await pool.request()
      .query(`SELECT targetWeight FROM trackables where FK_profileID = ${req.user.profileID}`);
      sendJSON.targetWeight = weightGoal.recordset;


      const targetWorkoutPull = await pool.request()
      .query(`SELECT workoutDays from trackables where FK_profileID = ${req.user.profileID}`);
      sendJSON.targetWorkout = targetWorkoutPull.recordset;


      const workoutCountThisMonthPull = await pool.request()
      .query(`SELECT COUNT(hadWorkout) FROM workout`);
      sendJSON.workoutCountThisMonth = workoutCountThisMonthPull.recordset;

      const waterGlassPull = await pool.request()
      .query('select top 1 waterGlasses from diet ORDER BY FK_dataEntryID DESC');
      sendJSON.waterGlasses = waterGlassPull.recordset;

      const startWeightPull = await pool.request()
      .query(`select weight from profile where profileID = ${req.user.profileID}`);
      sendJSON.startWeight = startWeightPull.recordset;     
/*
      const workoutGoal = await pool.request()
      .query('SELECT workoutDays FROM trackables');
      sendJSON.targetWorkout = workoutGoal.recordset;
*/

      //const sleep
        //.query('(SELECT TOP 1 * FROM weight ORDER BY currentWeight DESC), (SELECT profileName FROM profile WHERE profileID=1)');
        //.query('SELECT TOP 1 currentWeight, profileName FROM weight ORDER BY currentWeight DESC INNER JOIN profile WHERE profileID=1');

        res.send(sendJSON);
    }catch (err){
      res.status(400).send(`${err}`);
    }
    sql.close();
  });

  module.exports = router;
