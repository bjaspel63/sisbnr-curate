const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const newWork = {
    student: document.getElementById("studentName").value,
    title: document.getElementById("projectTitle").value,
    subject: document.getElementById("subject").value,
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
    approved: false
  };

  const pendingWorks = JSON.parse(localStorage.getItem("pendingWorks")) || [];

  pendingWorks.push(newWork);

  localStorage.setItem("pendingWorks", JSON.stringify(pendingWorks));

  alert("Student work uploaded successfully and is waiting for admin approval.");

  uploadForm.reset();
});
