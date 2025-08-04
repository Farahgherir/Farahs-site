const globe = document.getElementById('globe');
const markers = document.querySelectorAll('.marker');
const countryNameEl = document.getElementById('country-name');
const countryDescEl = document.getElementById('country-description');

const experiences = [
  { id: 'germany', lat: 30, lon: 0, name: 'Allemagne', description: "J'ai vécu en Allemagne pendant un semestre." },
  { id: 'italy', lat: -30, lon: 90, name: 'Italie', description: "Mon séjour en Italie m'a permis de découvrir la langue et la culture italienne." },
  { id: 'france', lat: 30, lon: 180, name: 'France', description: "En France, j'ai approfondi ma maîtrise du français tout en étudiant à Paris." },
  { id: 'switzerland', lat: -30, lon: -90, name: 'Suisse', description: "J'ai eu la chance d'étudier et de travailler en Suisse." }
];

function updateMarkersPositions() {
  const rotation = 0; // fixe rotation à 0

  experiences.forEach(exp => {
    const marker = document.querySelector(`.marker[data-country="${exp.id}"]`);
    const xyz = latLonToXYZ(exp.lat, exp.lon, R);
    const rotated = rotateY(xyz, rotation);
    const pos2D = project(rotated);

    if (marker.tagName.toLowerCase() === 'circle') {
      marker.setAttribute('cx', pos2D.cx);
      marker.setAttribute('cy', pos2D.cy);
    } else if (marker.tagName.toLowerCase() === 'image') {
      const w = parseFloat(marker.getAttribute('width'));
      const h = parseFloat(marker.getAttribute('height'));
      marker.setAttribute('x', pos2D.cx - w / 2);
      marker.setAttribute('y', pos2D.cy - h / 2);
    }

    marker.style.opacity = rotated.z < 0 ? '0.3' : '1';
  });

  globe.style.transform = `rotateY(0deg) rotateZ(0deg)`; // fixe la rotation CSS
}

// Juste mettre à jour les infos sur clic, sans aucune rotation
markers.forEach(marker => {
  marker.addEventListener('click', () => {
    const countryId = marker.dataset.country;
    const exp = experiences.find(e => e.id === countryId);
    if (exp) {
      countryNameEl.textContent = exp.name;
      countryDescEl.textContent = exp.description;
    }
  });
});

window.onload = () => {
  updateMarkersPositions();
};

