const cors = require('cors');
const auth = require('./routes/auth')
const setupSleep = require('./routes/setupSleep');
const setupWeightDiet = require('./routes/setupWeightDiet');
const setupWorkout = require('./routes/setupWorkout');
const profile = require('./routes/profile');
const diet = require('./routes/diet');
const sleep = require('./routes/sleep');
const workout = require('./routes/workout');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/sleep', sleep);
app.use('/api/auth', auth);
app.use('/api/setupSleep', setupSleep);
app.use('/api/setupWeightDiet', setupWeightDiet);
app.use('/api/setupWorkout', setupWorkout);
app.use('/api/profile', profile);
app.use('/api/diet', diet);
app.use('/api/workout', workout);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
