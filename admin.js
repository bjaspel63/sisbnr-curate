const pendingContainer = document.getElementById("pendingContainer");

let pendingWorks = JSON.parse(localStorage.getItem("pendingWorks")) || [];
let approvedWorks = JSON.parse(localStorage.getItem("approvedWorks")) || [];

function renderPending() {
  pendingContainer.innerHTML = "";

  if (pendingWorks.length === 0) {
    pendingContainer.innerHTML = "<p>No pending submissions.</p>";
    return;
  }

  pendingWorks.forEach((work, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${work.image || 'https://picsum.photos/400/300'}" alt="Project">

      <div class="card-content">
        <div class="subject-tag">${work.subject}</div>

        <h3>${work.title}</h3>

        <p>${work.description}</p>

        <strong>By: ${work.student}</strong>

        <div class="admin-actions">
          <button class="approve-btn" onclick="approveWork(${index})">
            Approve
          </button>

          <button class="delete-btn" onclick="deleteWork(${index})">
            Delete
          </button>
        </div>
      </div>
    `;

    pendingContainer.appendChild(card);
  });
}

function approveWork(index) {
  approvedWorks.push(pendingWorks[index]);

  localStorage.setItem(
    "approvedWorks",
    JSON.stringify(approvedWorks)
  );

  pendingWorks.splice(index, 1);

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  renderPending();
}

function deleteWork(index) {
  pendingWorks.splice(index, 1);

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  renderPending();
}

renderPending();
