function getSetupWorkout(){
  var setWorkout = {
    "workoutDays": document.getElementById('workoutSetupInput').value
  }
  return JSON.stringify(setWorkout);
}
document.getElementById('submitBtn').addEventListener('click', () => {
    let request = new XMLHttpRequest();
    request.open('PUT', 'https://trackerapp9.herokuapp.com/api/setupWorkout');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    request.send(getSetupWorkout());
});
