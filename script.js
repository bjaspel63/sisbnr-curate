const gallery = document.getElementById("gallery");
const highlightContainer = document.getElementById("highlightContainer");
const searchBox = document.getElementById("searchBox");
const subjectFilter = document.getElementById("subjectFilter");

const approvedWorks = JSON.parse(localStorage.getItem("approvedWorks")) || [];

function displayWorks() {
  gallery.innerHTML = "";

  const searchText = searchBox.value.toLowerCase();
  const selectedSubject = subjectFilter.value;

  const filtered = approvedWorks.filter(work => {
    const matchesSearch =
      work.title.toLowerCase().includes(searchText) ||
      work.student.toLowerCase().includes(searchText) ||
      work.description.toLowerCase().includes(searchText);

    const matchesSubject =
      selectedSubject === "all" || work.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  filtered.forEach(work => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${work.image || 'https://picsum.photos/400/300'}" alt="Project">

      <div class="card-content">
        <div class="subject-tag">${work.subject}</div>
        <h3>${work.title}</h3>
        <p>${work.description}</p>
        <strong>By: ${work.student}</strong>
      </div>
    `;

    gallery.appendChild(card);
  });
}

function displayHighlights() {
  highlightContainer.innerHTML = "";

  const highlights = approvedWorks.slice(0, 3);

  highlights.forEach(work => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${work.image || 'https://picsum.photos/400/300'}" alt="Project">

      <div class="card-content">
        <div class="subject-tag">Featured</div>
        <h3>${work.title}</h3>
        <p>${work.description}</p>
      </div>
    `;

    highlightContainer.appendChild(card);
  });
}

searchBox.addEventListener("input", displayWorks);
subjectFilter.addEventListener("change", displayWorks);

displayWorks();
displayHighlights();
