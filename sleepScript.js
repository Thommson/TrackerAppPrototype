
function getSleepRating(){
    var ratingValue = '';
    var inputElem = document.getElementsByClassName('sleepQality');
    for(var i=0; i<=4; i++){

        if(inputElem[i].checked){
            ratingValue = inputElem[i].value;
        }
    }

    var jsonFile = {
    "sleepHours": document.getElementById('sleepTime').value,
    "rating": ratingValue
    };
    return JSON.stringify(jsonFile);
}
document.getElementById('sleepSubmit').addEventListener('click', function(){
    var request = new XMLHttpRequest();

    request.open("POST", "http://trackerapp9.herokuapp.com/api/sleep");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    //const jsonFormatted = getSleepHours();
    //const jsonQuality = getSleepRating();
   // xmlhttp.send(jsonQuality);
   request.send(getSleepRating());
});
