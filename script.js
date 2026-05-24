const gallery = document.getElementById("gallery");
const highlightContainer = document.getElementById("highlightContainer");
const searchBox = document.getElementById("searchBox");

const filterButtons = document.querySelectorAll(".filter-btn");

let selectedSubject = "all";

const approvedWorks =
  JSON.parse(localStorage.getItem("approvedWorks")) || [];

function displayWorks() {

  gallery.innerHTML = "";

  const searchText = searchBox.value.toLowerCase();

  const filtered = approvedWorks.filter(work => {

    const matchesSearch =
      work.title.toLowerCase().includes(searchText) ||
      work.student.toLowerCase().includes(searchText) ||
      work.description.toLowerCase().includes(searchText);

    const matchesSubject =
      selectedSubject === "all" ||
      work.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  filtered.forEach((work, index) => {

    if (!work.likes) {
      work.likes = 0;
    }

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${work.image || 'https://picsum.photos/400/300'}">

      <div class="card-content">

        <div class="subject-tag">
          ${work.subject}
        </div>

        <h3>${work.title}</h3>

        <p>${work.description}</p>

        <strong>By ${work.student}</strong>

        <div class="card-footer">

          <button class="star-btn" onclick="likePost(${index})">
            ⭐ ${work.likes}
          </button>

        </div>

      </div>
    `;

    gallery.appendChild(card);

  });

}

function likePost(index) {

  approvedWorks[index].likes++;

  localStorage.setItem(
    "approvedWorks",
    JSON.stringify(approvedWorks)
  );

  displayWorks();

}

function displayHighlights() {

  highlightContainer.innerHTML = "";

  const highlights = approvedWorks.slice(0, 3);

  highlights.forEach(work => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${work.image || 'https://picsum.photos/400/300'}">

      <div class="card-content">

        <div class="subject-tag">
          ⭐ Featured
        </div>

        <h3>${work.title}</h3>

        <p>${work.description}</p>

      </div>
    `;

    highlightContainer.appendChild(card);

  });

}

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    selectedSubject = button.dataset.subject;

    displayWorks();

  });

});

searchBox.addEventListener("input", displayWorks);

displayWorks();
displayHighlights();
