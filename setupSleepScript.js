function getSetupHours(){
  var setHours = {
    "sleepHours": document.getElementById('sleepSetupInput').value
  }
  return JSON.stringify(setHours);
}


document.getElementById('submitBtn').addEventListener('click', () => {
    let request = new XMLHttpRequest();

    request.open('PUT', 'http://127.0.0.1:3000/api/setupSleep');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    request.send(getSetupHours());
});
