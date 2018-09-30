function getSetupWeightDiet(){
  var trackDiet = '';
  if(document.getElementById('dietSetupInput').checked === true){
    trackDiet = 1;
  }else{
    trackDiet = 0;
  }
  var setWeightDiet = {
    "targetWeight": document.getElementById('weightSetupInput').value,
    "trackDiet": trackDiet
  }
  return JSON.stringify(setWeightDiet);
}
document.getElementById('submitBtn').addEventListener('click', () => {
    let request = new XMLHttpRequest();
    request.open('PUT', 'https://trackerapp9.herokuapp.com/api/setupWeightDiet');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
    request.send(getSetupWeightDiet());
});
