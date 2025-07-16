let data = {};

fetch("travel_recommendation_api.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    console.log("JSON chargé :", data);
    remplirListePays(); 
  });

function rechercher() {
  const motCle = document.getElementById("search").value.toLowerCase().trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  data.countries.forEach((country) => {
    if (country.name.toLowerCase().includes(motCle)) {
      country.cities.forEach(afficherResultat);
    } else {
      country.cities.forEach((city) => {
        if (
          city.name.toLowerCase().includes(motCle) ||
          city.description.toLowerCase().includes(motCle)
        ) {
          afficherResultat(city);
        }
      });
    }
  });

  data.temples.forEach((temple) => {
    if (
      motCle.includes("temple") ||
      temple.name.toLowerCase().includes(motCle)
    ) {
      afficherResultat(temple);
    }
  });

  data.beaches.forEach((beach) => {
    if (
      motCle.includes("plage") ||
      motCle.includes("beach") ||
      beach.name.toLowerCase().includes(motCle)
    ) {
      afficherResultat(beach);
    }
  });

  if (results.innerHTML.trim() === "") {
    results.innerHTML = "<p>Aucun résultat trouvé.</p>";
  }
}

function afficherResultat(lieu) {
  const results = document.getElementById("results");
  const image = lieu.imageUrl && lieu.imageUrl !== "enter_your_image_for_sydney.jpg"
    ? lieu.imageUrl
    : "images/placeholder.jpg";

  results.innerHTML += `
    <div class="card">
      <img src="${image}" alt="${lieu.name}" />
      <h3>${lieu.name}</h3>
      <p>${lieu.description}</p>
    </div>
  `;
}

function reinitialiser() {
  document.getElementById("search").value = "";
  document.getElementById("results").innerHTML = "";
}

function afficherHeure(pays = 'Europe/Paris') {
  const options = {
    timeZone: pays,
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const heure = new Date().toLocaleTimeString('fr-FR', options);
  document.getElementById("heure").innerText = "Heure locale : " + heure;
}

setInterval(() => afficherHeure(), 1000);
function remplirListePays() {
    const liste = document.getElementById("liste-pays");
    if (!liste) return;
  
    data.countries.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country.name;
  
      // Ajout d'interactivité :
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        document.getElementById("results").innerHTML = ""; // Nettoyer
        country.cities.forEach(afficherResultat);
      });
  
      liste.appendChild(li);
    });
  }
  