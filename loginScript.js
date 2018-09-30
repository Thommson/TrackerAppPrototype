function getProfile(){
  var setProfile = {
    "profileName": document.getElementById('profileName').value,
    "profilePassword": document.getElementById('profilePassword').value
  }
  return JSON.stringify(setProfile);
}

document.getElementById('submitBtn').addEventListener('click', () => {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:3000/api/auth');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.addEventListener('load', function () {
      localStorage.removeItem('x-auth-token');
      localStorage.setItem('x-auth-token', request.response);
    })
    request.send(getProfile());
});
