
let name = document.getElementById('name');
let sleepAverage = document.getElementById('sleepAvg');
let workoutCount = document.getElementById('workouts');
let currentWeight = document.getElementById('weight');
let currentHeight = document.getElementById('height');
let sleepSatisfaction = document.getElementById('sleepSatisf');
let BMIstatus = document.getElementById('BMI');
let workoutsDone = document.getElementById('workoutsDone');
let weightLost = document.getElementById('weightLost');
let wasserGlasses = document.getElementById('glassesDrank');

function BMICalc(){
    var height = currentHeight.innerText;
    var weight = currentWeight.innerText;
    var weightNumber = parseInt(weight, 10);
    var heightNumber = parseInt(height, 10);

    var BMI = Math.round(weightNumber/Math.pow(heightNumber, 2)*10000*100)/100;
    if(BMI < 18.5) BMIstatus.innerText = ' Underweight ';
    if(BMI >= 18.5 && BMI <= 25 ) BMIstatus.innerText = ' Healthy ';
    if(BMI >= 25 && BMI <= 30 ) BMIstatus.innerText = BMI + ' Overweight ';
    if(BMI > 30) BMIstatus.innerText = ' Obese ';
    
    BMIstatus.innerText += ' ';

}

function sleepSat(){
    if(sleepSatisfaction.innerText == 1) sleepSatisfaction.innerText = 'Very poor sleep (1/5)';
    if(sleepSatisfaction.innerText == 2) sleepSatisfaction.innerText = 'Poor sleep (2/5)';
    if(sleepSatisfaction.innerText == 3) sleepSatisfaction.innerText = 'Average sleep (3/5)';
    if(sleepSatisfaction.innerText == 4) sleepSatisfaction.innerText = 'Good sleep (4/5)';
    if(sleepSatisfaction.innerText == 5) sleepSatisfaction.innerText =  'Great sleep (5/5)';
}
window.addEventListener('load', () => {
    var request = new XMLHttpRequest();

    request.open("GET", "http://127.0.0.1:3000/api/profile");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    request.onload = () => {
        var responseJSON = JSON.parse(request.responseText);
        console.log(JSON.parse(request.responseText));
        //console.log(Object.values(responseJSON.sleep[0]));
        name.innerText = responseJSON.prof[0].profileName;
        sleepAverage.innerText = Math.round(Object.values(responseJSON.sleep[0])) + ' hours';
        workoutCount.innerText = Object.values(responseJSON.workoutCountThisMonth[0]) + ' workouts';
        currentWeight.innerText = responseJSON.weight[0].currentWeight +' kg';
        currentHeight.innerText = responseJSON.height[0].height + ' cm';
        sleepSatisfaction.innerText = Object.values(responseJSON.sleepSatis[0]);
        var currWeight = Number(responseJSON.weight[0].currentWeight);
        var targetWeight = responseJSON.targetWeight[0].targetWeight;
        var workoutCountThisMonth = Object.values(responseJSON.workoutCountThisMonth[0]);
        var targetWorkout = Number(Object.values(responseJSON.targetWorkout[0]));
        var waterGlasses = responseJSON.waterGlasses[0].waterGlasses;
        var startWeight = Number(responseJSON.startWeight[0].weight);
        console.log(targetWorkout);
        //var targetWorkout = responseJSON.targetWorkout[0].targetWorkout;
        function weightLoss(){
            document.getElementById('weightLossProgress').style.width = ((startWeight-currWeight)/(startWeight-targetWeight)*100).toString() + '%';
            weightLost.innerText = Number(startWeight-currWeight) + 'kg / ' + Number(startWeight-targetWeight) + 'kg';
            
        }
        
        function workout(){
            document.getElementById('workoutProgress').style.width = ((workoutCountThisMonth/targetWorkout)*100).toString() + '%';
            workoutsDone.innerText = workoutCountThisMonth.toString() + ' / ' + targetWorkout.toString() + ' workouts';
        
        }
    
        function waterGlassDrunk(){
            document.getElementById('waterGlassProgress').style.width = ((waterGlasses/8)*100).toString() + '%';
            wasserGlasses.innerText = waterGlasses.toString() + ' / 8' + ' glasses';
        }
        sleepSat();
        BMICalc();
        weightLoss();
        workout();
        waterGlassDrunk();
        };
   request.send();
   console.log('viewed');
});
