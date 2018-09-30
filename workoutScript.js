function getWorkOut(){
    var workedOut = '';
    if(document.getElementById('workedOut').checked === true){
        workedOut = 1;
    }else{
        workedOut = 0;
    }

    var gotInjured = '';
    if(document.getElementById('gotInjured').checked === true){
        gotInjured = 1;
    }else{
        gotInjured = 0;
    }
    var setWorkoutItems = {
        "currentWeight": document.getElementById('inputWeight').value,
        "workedOut": workedOut,
        "gotInjured": gotInjured
      };
      return JSON.stringify(setWorkoutItems);
}
document.getElementById('workoutSubmit').addEventListener('click', function(){
    var request = new XMLHttpRequest();
    
    request.open("POST", "http://127.0.0.1:3000/api/workout");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    //const jsonFormatted = getSleepHours();
    //const jsonQuality = getSleepRating();
   // xmlhttp.send(jsonQuality);
   request.send(getWorkOut());
});