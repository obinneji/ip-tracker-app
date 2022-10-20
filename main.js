const inputlEl = document.getElementById("input-address");
const country = document.getElementById("country");
const timeZone = document.getElementById("timezone");
const ipAddress = document.getElementById("ip-address");
const isp = document.getElementById("isp")
const SubmitEl = document.getElementById("submit-btn")
let lattidue
let longitude

var locationIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [30, 40], // size of the icon
  iconAnchor: [19, 50], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});



function getIpAddress() {

  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_soGuPOxwtomnfiiHtMmRelQceGy3R&ipAddress=${inputlEl.value}&domain=${inputlEl.value
    }`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.location.lat)
      lattidue = data.location.lat
      longitude = data.location.lng
      ipAddress.textContent = data.ip
      country.textContent = data.location.region + "," + data.location.country
      timeZone.textContent = `UTC ${data.location.timezone}`
      isp.textContent = data.isp;
      let map = L.map('map').setView([lattidue, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      var container = L.DomUtil.get('map');
      if (container != null) {
        container._leaflet_id = null;
      }
      L.marker([lattidue, longitude], { icon: locationIcon }).addTo(map);
    });
}

SubmitEl.addEventListener("click", function (e) {
  getIpAddress();
})

