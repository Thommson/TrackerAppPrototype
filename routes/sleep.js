const auth = require('../middleware/auth');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');



router.get('/', (req, res) => {

    sql.connect(con, function(err){
        const dbrequest = new sql.Request();
        dbrequest.query('SELECT * FROM sleep', function(err, data){ 
            if(err){
                console.log(err);
                sql.close();
                return;
            }
            res.send(JSON.stringify(data.recordset));
            sql.close();
        });
    });
});

router.post('/', auth, async (req, res) => {
    try{
        const pool = await sql.connect(con);
        const dataEntry = await pool.request()
      //.query('update trackables set sleepHours = @sleepHours');
      .query(`INSERT INTO dataEntry (FK_profileID) VALUES(${req.user.profileID})`);

      const FK_dataEntryID = await pool.request()
      .query('select COUNT(dataEntryID) from dataEntry');
        //console.log(Number(Object.values(FK_dataEntryID.recordset[0])));
        const user = await pool.request()
          .input('FK_dataEntryID', sql.Int, Number(Object.values(FK_dataEntryID.recordset[0])))
          .input('sleepHours', sql.Int, req.body.sleepHours)
          .input('sleepQuality', sql.Int, req.body.rating)
          .query('INSERT INTO sleep (FK_dataEntryID, sleepHours, sleepQuality) VALUES (@FK_dataEntryID, @sleepHours, @sleepQuality)');
        res.send(JSON.stringify(user.recordset));
      }catch (err){
        res.status(400).send(`${err}`);
      }
      sql.close();
    });

module.exports = router;