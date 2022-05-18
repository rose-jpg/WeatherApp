const iconElement = document.querySelector('.img')
const tempElement = document.querySelector('.temperatureValue')
const humElement = document.querySelector('.humidityValue')
const descElement = document.querySelector('.decriptionValue')
const  locationElement = document.querySelector('.weatherIcon')
const  changeTheme = document.querySelector('.weather')
const  body = document.querySelector('body')
const  changeMark = document.querySelector('.indicator')
const  currentFeel = document.querySelector('.currentFeel')
const  feelsLike = document.querySelector('.feelsLike')

const toogle = document.getElementById('toogle')


changeMark.addEventListener('click',move);


function move(){
   changeMark.classList.toggle('active')
   changeTheme.classList.toggle('active')
   body.classList.toggle('active')
  

    
}







const weather = {};
weather.temperature = {
    unit: 'celsius'
};
 const KELVIN = 273;

 const key ='00caff80d1374a0158d10c572dc19ef5';


 if('geolocation' in navigator){
     navigator.geolocation.getCurrentPosition(setPosition,showError);
 }else{
    alert("browser doesn't support geolocation");
 }

function setPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

function showError(error){
    alert("browser doesn't support geolocation")
}

function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=00caff80d1374a0158d10c572dc19ef5`
    fetch(api).then(function(response){
        let data = response.json();
        return data;
        
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp- KELVIN)
        weather.description = data.weather[0].description;
        weather.IconId = data.weather[0].icon;
        weather.currentFeel = data.weather[0].main;
        weather.city = data.name;
        weather.feelsLike = Math.floor(data.main.feels_like- KELVIN)
        weather.humidity = data.main.humidity;
       
        
        weather.country = data.sys.country;
        console.log(data)

    })
    .then(function(){
        displayWeather();
    })
}

function displayWeather(){
    iconElement.innerHTML = `<img src "icons/${weather.IconId}.png">`
    tempElement.innerHTML= `${weather.temperature.value}<span class="deg">&deg;</span>`
    humElement.innerHTML= `${weather.humidity}<span>%</span>`
    currentFeel.innerHTML= weather.currentFeel
    feelsLike.innerHTML= `${weather.feelsLike}<span>&deg;c</span>`
    descElement.innerHTML = weather.description.toUpperCase();
    locationElement.innerHTML =`${weather.city},${weather.country}`
   



}