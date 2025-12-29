// =====================
// TEAMS
// =====================
const TEAMS = {
  svetunited: { name: "Svet United", logo: "/sister-cities/assets/svetunited.png" },
  sixowls: { name: "6ixOwls", logo: "/sister-cities/assets/sixowls.png" },
  arshamaa: { name: "ArShamaa", logo: "/sister-cities/assets/arshamaa.png" },
  maleksexcornflex: { name: "Malek Sex & Cornflex", logo: "/sister-cities/assets/maleksexcornflex.png" }
};

// =====================
// SEASONS
// =====================
const seasons = {
  2025: { champion: "svetunited", poster: "2025-champion.png" },
  2024: { champion: "sixowls", poster: "2024-champion.png" },
  2023: { champion: "sixowls", poster: "2023-champion.png" },
  2022: { champion: "arshamaa", poster: "2022-champion.png" },
  2021: { champion: "maleksexcornflex", poster: "2021-champion.png" }
};

// =====================
// CHAMP COUNT
// =====================
function countTitles(teamId, year) {
  return Object.entries(seasons)
    .filter(([y, s]) => Number(y) <= year && s.champion === teamId)
    .length;
}

// =====================
// RENDER CHAMPION
// =====================
function renderChampion(year) {
  const season = seasons[year];
  const team = TEAMS[season.champion];

  const stars = "★".repeat(countTitles(season.champion, year));

  document.getElementById("championTeam").innerHTML = `
    <div class="champion-stars">${stars}</div>
    <img class="champion-logo" src="${team.logo}" />
    <div class="champion-team-name">${team.name}</div>
  `;

  const poster = document.getElementById("championPoster");
  poster.src = `/sister-cities/assets/${season.poster}`;
  poster.dataset.full = poster.src;
}

// =====================
// TABS
// =====================
document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tabpanel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
  };
});

// =====================
// YEARS
// =====================
document.querySelectorAll(".season-year-button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".season-year-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderChampion(Number(btn.dataset.season));
  };
});

// =====================
// MODAL
// =====================
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("galleryModalImg");
const closeBtn = document.getElementById("galleryClose");

document.addEventListener("click", e => {
  if (e.target.dataset.full) {
    modalImg.src = e.target.dataset.full;
    modal.style.display = "flex";
  }
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalImg.src = "";
};

modal.onclick = e => {
  if (e.target === modal) closeBtn.onclick();
};

// INIT
renderChampion(2025);
