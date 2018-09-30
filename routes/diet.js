const auth = require('../middleware/auth');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const con = require('../config/connection');
const sql = require('mssql');

router.post('/', auth, async (req, res) => {
  try{
    const pool = await sql.connect(con);
    const dataEntry = await pool.request()
    .query(`INSERT INTO dataEntry (FK_profileID) VALUES(${req.user.profileID})`);

    const FK_dataEntryID = await pool.request()
      .query('select COUNT(dataEntryID) from dataEntry');
    const user = await pool.request()
    .input('FK_dataEntryID', sql.Int, Number(Object.values(FK_dataEntryID.recordset[0])))
      .input('hadSoda', sql.Bit , req.body.hadSoda)
      .input('hadCaffeine', sql.Bit , req.body.hadCaffeine)
      .input('hadAlcohol', sql.Bit , req.body.hadAlcohol)
      .input('hadJunkFood', sql.Bit , req.body.hadJunkFood)
      .input('hadCigarettes', sql.Bit , req.body.hadCigarettes)
      .input('waterGlasses', sql.Int , req.body.waterGlasses)
      //.query('update diet set hadSoda = @hadSoda, hadCaffeine = @hadCaffeine, hadAlcohol = @hadAlcohol, hadJunkFood = @hadJunkFood, hadCigarettes = @hadCigarettes, waterGlasses = @waterGlasses');
      .query('insert into diet (FK_dataEntryID, waterGlasses, hadAlcohol, hadSoda, hadCaffeine, hadCigarettes, hadJunkFood) values(@FK_dataEntryID, @waterGlasses, @hadAlcohol, @hadSoda, @hadCaffeine, @hadCigarettes, @hadJunkFood)')
    res.send(JSON.stringify(user.recordset));
  }catch (err){
    res.status(400).send(`${err}`);
  }
  sql.close();
});
module.exports = router;
