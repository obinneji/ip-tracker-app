const inputlEl = document.getElementById("input-address");
const country = document.getElementById("country");
const timeZone = document.getElementById("timezone");
const ipAddress = document.getElementById("ip-address");
const isp= document.getElementById("isp")
const SubmitEl= document.getElementById("submit-btn")

  
var locationIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [19, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

 function getIpAddress(){
    
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_soGuPOxwtomnfiiHtMmRelQceGy3R&ipAddress=${inputlEl.value}`)
  .then((response) => response.json())
  .then((data) =>{ 
    let lat = data.location.lat
    let lng = data.location.lng
  ipAddress.textContent = data.ip
  country.textContent = data.location.region + "," + data.location.country
  timeZone.textContent = `UTC ${data.location.timezone}`
  isp.textContent = data.isp
var map = L.map('map').setView([lat,lng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
L.marker([lat,lng], {icon: locationIcon}).addTo(map);

  });
}

SubmitEl.addEventListener("click", function(){
    getIpAddress()
})

