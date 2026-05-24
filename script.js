const gallery = document.getElementById("gallery");
const highlightContainer =
  document.getElementById("highlightContainer");

const searchBox =
  document.getElementById("searchBox");

const filterButtons =
  document.querySelectorAll(".filter-btn");

let selectedSubject = "all";

const approvedWorks =
  JSON.parse(localStorage.getItem("approvedWorks")) || [];

/* DISPLAY POSTS */

function displayWorks() {

  gallery.innerHTML = "";

  const searchText =
    searchBox.value.toLowerCase();

  const filtered = approvedWorks.filter(work => {

    const matchesSearch =

      work.title.toLowerCase().includes(searchText) ||

      work.description.toLowerCase().includes(searchText) ||

      work.taggedName.toLowerCase().includes(searchText);

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

      <img src="https://picsum.photos/500/300?random=${index}">

      <div class="card-content">

        <div class="subject-tag">
          ${work.subject}
        </div>

        <h3>${work.title}</h3>

        <p>
          ${work.description.substring(0, 100)}...
        </p>

        <strong>
          ${work.taggedName}
        </strong>

        <div class="card-footer">

          <button
            class="star-btn"
            onclick="event.stopPropagation(); likePost(${index})"
          >
            ⭐ ${work.likes}
          </button>

        </div>

      </div>
    `;

    card.addEventListener("click", () => {
      openModal(work, index);
    });

    gallery.appendChild(card);

  });

}

/* LIKE */

function likePost(index) {

  approvedWorks[index].likes++;

  localStorage.setItem(
    "approvedWorks",
    JSON.stringify(approvedWorks)
  );

  displayWorks();

}

/* HIGHLIGHTS */

function displayHighlights() {

  highlightContainer.innerHTML = "";

  const highlights =
    approvedWorks.slice(0, 3);

  highlights.forEach((work, index) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <img src="https://picsum.photos/500/300?random=highlight${index}">

      <div class="card-content">

        <div class="subject-tag">
          ⭐ Featured
        </div>

        <h3>${work.title}</h3>

        <p>
          ${work.description.substring(0, 90)}...
        </p>

      </div>

    `;

    card.addEventListener("click", () => {
      openModal(work, index);
    });

    highlightContainer.appendChild(card);

  });

}

/* FILTER */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    selectedSubject =
      button.dataset.subject;

    displayWorks();

  });

});

/* SEARCH */

searchBox.addEventListener(
  "input",
  displayWorks
);

/* MODAL */

function openModal(work, index) {

  const modal = document.createElement("div");

  modal.className = "modal";

  modal.innerHTML = `

    <div class="modal-content">

      <span class="close-modal">
        &times;
      </span>

      <img
        class="modal-image"
        src="https://picsum.photos/800/400?random=modal${index}"
      >

      <h2>${work.title}</h2>

      <div class="modal-tag">
        ${work.subject}
      </div>

      <p class="modal-description">
        ${work.description}
      </p>

      <div class="modal-info">

        <p>
          <strong>Student:</strong>
          ${work.taggedName}
        </p>

        <p>
          <strong>Class:</strong>
          ${work.studentClass}
        </p>

        <p>
          <strong>Teacher:</strong>
          ${work.teacherName}
        </p>

        <p>
          <strong>Uploaded:</strong>
          ${work.uploadedAt}
        </p>

      </div>

      ${
        work.projectLink
          ? `
            <a
              class="project-link"
              href="${work.projectLink}"
              target="_blank"
            >
              Open Project Link
            </a>
          `
          : ""
      }

      <div class="modal-files">

        <h3>Uploaded Files</h3>

        ${
          work.files.length > 0
            ? work.files.map(file => `
                <div class="file-item">
                  📎 ${file.name}
                </div>
              `).join("")
            : "<p>No files uploaded.</p>"
        }

      </div>

    </div>

  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".close-modal")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal.addEventListener("click", e => {

    if (e.target === modal) {
      modal.remove();
    }

  });

}

/* START */

displayWorks();
displayHighlights();
