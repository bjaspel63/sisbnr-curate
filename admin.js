const pendingContainer =
  document.getElementById("pendingContainer");

let pendingWorks =
  JSON.parse(localStorage.getItem("pendingWorks")) || [];

let approvedWorks =
  JSON.parse(localStorage.getItem("approvedWorks")) || [];

/* RENDER PENDING POSTS */

function renderPending() {

  pendingContainer.innerHTML = "";

  if (pendingWorks.length === 0) {

    pendingContainer.innerHTML =
      "<p>No pending submissions.</p>";

    return;

  }

  pendingWorks.forEach((work, index) => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <img
        src="https://picsum.photos/500/300?random=${index}"
      >

      <div class="card-content">

        <div class="subject-tag">
          ${work.subject}
        </div>

        <h3>
          ${work.title}
        </h3>

        <p>
          ${work.description}
        </p>

        <strong>
          ${work.taggedName}
        </strong>

        <div class="admin-info">

          <p>
            <strong>Class:</strong>
            ${work.studentClass}
          </p>

          <p>
            <strong>Teacher:</strong>
            ${work.teacherName}
          </p>

        </div>

        <textarea
          id="comment-${index}"
          placeholder="Add comment for teacher..."
          class="admin-comment"
        ></textarea>

        <div class="admin-actions">

          <button
            class="approve-btn"
            onclick="approveWork(${index})"
          >
            Approve
          </button>

          <button
            class="feature-btn"
            onclick="toggleFeature(${index})"
          >
            ${work.featured ? "Unfeature" : "Feature"}
          </button>

          <button
            class="comment-btn"
            onclick="saveComment(${index})"
          >
            Save Comment
          </button>

          <button
            class="delete-btn"
            onclick="deleteWork(${index})"
          >
            Delete
          </button>

        </div>

      </div>

    `;

    pendingContainer.appendChild(card);

  });

}

/* APPROVE */

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

/* DELETE */

function deleteWork(index) {

  const confirmDelete =
    confirm("Delete this post?");

  if (!confirmDelete) return;

  pendingWorks.splice(index, 1);

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  renderPending();

}

/* FEATURE */

function toggleFeature(index) {

  pendingWorks[index].featured =
    !pendingWorks[index].featured;

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  renderPending();

}

/* COMMENT */

function saveComment(index) {

  const comment =
    document.getElementById(`comment-${index}`).value;

  pendingWorks[index].adminComment =
    comment;

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  alert("Comment saved.");

}

/* START */

renderPending();
