let socket;
let map;
let jaugeChart;

document.addEventListener('DOMContentLoaded', () => {
  socket = io();

  // Init Leaflet
  map = L.map('map').setView([20, -30], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Charger le GeoJSON
  fetch('/datas/zones_maritimes.json')
    .then(res => res.json())
    .then(data => {
      data.features.forEach(zone => {
        let coords = zone.geometry.coordinates[0].map(c => [c[1], c[0]]);
        let popupContent = `
          <div>
            <h4>${zone.properties.nom}</h4>
            <p><strong>Superficie:</strong> ${zone.properties.superficie}</p>
            <p><strong>Écosystème:</strong> ${zone.properties.ecosysteme}</p>
            <button onclick="choisirZone('${zone.properties.nom}')" class="btn btn-primary mt-2">Choisir</button>
          </div>
        `;
        let poly = L.polygon(coords, { color: "blue", fillOpacity: 0.3 })
          .bindPopup(popupContent)
          .addTo(map);

        let zoneItem = document.createElement('div');
        zoneItem.classList.add('zone-item', 'animate__animated', 'animate__fadeInLeft');
        zoneItem.innerHTML = `
          <i class="fas fa-water"></i>
          ${zone.properties.nom}
          <button class="btn-choisir" onclick="choisirZone('${zone.properties.nom}')">Choisir</button>
        `;
        zoneItem.addEventListener('click', () => {
          map.fitBounds(poly.getBounds());
          poly.openPopup();
          mettreAJourJauge(130);
        });

        document.getElementById('zone-list').appendChild(zoneItem);
      });
    })
    .catch(err => console.error("Erreur JSON:", err));

  initialiserJauge();
});

function choisirZone(zone) {
  console.log(`[Map] On choisit la zone: ${zone}`);
  socket.emit('zoneSelected', zone);
  // Redirection → /oceansim?zone=...
  window.location.href = "/oceansim?zone=" + encodeURIComponent(zone);
}


function initialiserJauge() {
  const ctx = document.getElementById("jaugeBruit").getContext("2d");
  jaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Bruit (dB)", "Silence"],
      datasets: [{
        data: [120, 180],
        backgroundColor: ["#ff4500", "#dcdcdc"]
      }]
    },
    options: {
      responsive: true,
      cutout: "75%",
      plugins: { legend: { display: false } }
    }
  });
  document.getElementById('niveauBruitTexte').textContent = "120 dB";
}

function mettreAJourJauge(value=120) {
  if (!jaugeChart) return;
  const maxValue = 300;
  jaugeChart.data.datasets[0].data[0] = value;
  jaugeChart.data.datasets[0].data[1] = maxValue - value;
  jaugeChart.update();
  document.getElementById('niveauBruitTexte').textContent = value + " dB";
}
