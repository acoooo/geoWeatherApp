let errorDiv = document.getElementById("errors");
let errorDiv2 = document.getElementById("errors2");
let geoText = document.getElementById("geoInfo");
let geoText2 = document.getElementById("geoInfo2");
let cloudInfo = document.getElementById('cloudInfo');
let cloudInfo2 = document.getElementById('cloudInfo2');

document.getElementById("depSubmit").addEventListener('click', getDeparture);
document.getElementById("desSubmit").addEventListener('click', getDestination);
document.getElementById('geoForm').addEventListener('submit', getDeparture);
document.getElementById('geoForm2').addEventListener('submit', getDestination);

function getDeparture(e){
  e.preventDefault();

  let loc = document.getElementById('loc1').value;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'geoAPI.php?location='+loc, true);
  xhr.send();

  xhr.onload = function(){
    cloudInfo.innerHTML = "";
    errorDiv.innerHTML = "";
    let geo = JSON.parse(this.responseText);
    // console.log(geo);
    if (Object.keys(geo.error).length === 0){
      let dew = geo.dewpointTemperature['@attributes'].value;
      let humidity = geo.humidity['@attributes'].value;
      let temperature = geo.temperature['@attributes'].value;
      let fog = geo.fog['@attributes'].percent;
      let lclouds = geo.lowClouds['@attributes'].percent;
      let mclouds = geo.mediumClouds['@attributes'].percent;
      let hclouds = geo.highClouds['@attributes'].percent;
      
      geoText.innerHTML = "<h3>Departure weather</h3>";
      geoText.innerHTML += "<p>Dew point: "+dew+"*</p>";
      geoText.innerHTML += "<p>Humidity: "+humidity+"%</p>";
      geoText.innerHTML += "<p>Temperature: "+temperature+"C</p>"; 

      cloudInfo.innerHTML += '<div id="weatherInfo"';
      cloudInfo.innerHTML += "<div id='fogDIV'>Fog: "+fog+"%</div>";
      cloudInfo.innerHTML += "<div id='lowDIV'>Low clouds: "+lclouds+"%</div>";
      cloudInfo.innerHTML += "<div id='medDIV'>Medium clouds: "+mclouds+"%</div>";
      cloudInfo.innerHTML += "<div id='highDIV'>High clouds: "+hclouds+"%</div>";
      cloudInfo.innerHTML += "</div>";

      if (fog <= 20){
        document.getElementById('fogDIV').classList.add('sun');
      }
      else {
        document.getElementById('fogDIV').classList.add('fog');
      }

      if (lclouds >= 50){
        document.getElementById('lowDIV').classList.add('low');
      }
      else {
        document.getElementById('lowDIV').classList.add('clear');
      }

      if (mclouds >= 50){
        document.getElementById('medDIV').classList.add('medium');
      }
      else {
        document.getElementById('medDIV').classList.add('clear');
      }

      if (hclouds >= 50){
        document.getElementById('highDIV').classList.add('high');
      }
      else {
        document.getElementById('highDIV').classList.add('clear');
      }


    }
    else {
      errorDiv.innerHTML = "Error while retrieving results. Please check your entry and try again.";
    }
     
  }

}

function getDestination(e){
  e.preventDefault();

  let loc = document.getElementById('loc2').value;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'geoAPI.php?location='+loc, true);
  xhr.send();

  xhr.onload = function(){
    cloudInfo2.innerHTML = "";
    errorDiv2.innerHTML = "";
    let geo = JSON.parse(this.responseText);
    // console.log(geo);
    if (Object.keys(geo.error).length === 0){
      let dew = geo.dewpointTemperature['@attributes'].value;
      let humidity = geo.humidity['@attributes'].value;
      let temperature = geo.temperature['@attributes'].value;
      let fog = geo.fog['@attributes'].percent;
      let lclouds = geo.lowClouds['@attributes'].percent;
      let mclouds = geo.mediumClouds['@attributes'].percent;
      let hclouds = geo.highClouds['@attributes'].percent;
      
      geoText2.innerHTML = "<h3>Departure weather</h3>";
      geoText2.innerHTML += "<p>Dew point: "+dew+"*</p>";
      geoText2.innerHTML += "<p>Humidity: "+humidity+"%</p>";
      geoText2.innerHTML += "<p>Temperature: "+temperature+"C</p>"; 

      cloudInfo2.innerHTML += '<div id="weatherInfo2"';
      cloudInfo2.innerHTML += "<div id='fogDIV2'>Fog: "+fog+"%</div>";
      cloudInfo2.innerHTML += "<div id='lowDIV2'>Low clouds: "+lclouds+"%</div>";
      cloudInfo2.innerHTML += "<div id='medDIV2'>Medium clouds: "+mclouds+"%</div>";
      cloudInfo2.innerHTML += "<div id='highDIV2'>High clouds: "+hclouds+"%</div>";
      cloudInfo2.innerHTML += "</div>";

      if (fog <= 20){
        document.getElementById('fogDIV2').classList.add('sun');
      }
      else {
        document.getElementById('fogDIV2').classList.add('fog');
      }

      if (lclouds >= 50){
        document.getElementById('lowDIV2').classList.add('low');
      }
      else {
        document.getElementById('lowDIV2').classList.add('clear');
      }

      if (mclouds >= 50){
        document.getElementById('medDIV2').classList.add('medium');
      }
      else {
        document.getElementById('medDIV2').classList.add('clear');
      }

      if (hclouds >= 50){
        document.getElementById('highDIV2').classList.add('high');
      }
      else {
        document.getElementById('highDIV2').classList.add('clear');
      }


    }
    else {
      errorDiv2.innerHTML = "Error while retrieving results. Please check your entry and try again.";
    }
     
  }

}