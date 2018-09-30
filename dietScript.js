function getDietItems(){

    var hadSoda = '';
    if(document.getElementById('hadSoda').checked === true){
      hadSoda = 1;
    }else{
      hadSoda = 0;
    }

    var hadCaffeine = '';
    if(document.getElementById('hadCaffeine').checked === true){
      hadCaffeine = 1;
    }else{
      hadCaffeine = 0;
    }

    var hadAlcohol = '';
    if(document.getElementById('hadAlcohol').checked === true){
      hadAlcohol = 1;
    }else{
      hadAlcohol = 0;
    }

    var hadJunkFood = '';
    if(document.getElementById('hadJunkFood').checked === true){
      hadJunkFood = 1;
    }else{
      hadJunkFood = 0;
    }

    var hadCigarettes = '';
    if(document.getElementById('hadCigarettes').checked === true){
      hadCigarettes = 1;
    }else{
      hadCigarettes = 0;
    }

    var setDietItems = {
      "hadSoda": hadSoda,
      "hadCaffeine": hadCaffeine,
      "hadAlcohol": hadAlcohol,
      "hadJunkFood": hadJunkFood,
      "hadCigarettes": hadCigarettes,
      "waterGlasses": document.getElementById('waterGlasses').value
    }
    return JSON.stringify(setDietItems);
  }
  document.getElementById('submitBtn').addEventListener('click', () => {
      let request = new XMLHttpRequest();
      request.open('POST', 'http://trackerapp9.herokuapp.com/api/diet');
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.setRequestHeader("x-auth-token", localStorage.getItem('x-auth-token'));
      request.send(getDietItems());
  });
