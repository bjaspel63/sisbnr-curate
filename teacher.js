const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const files =
    document.getElementById("mediaUpload").files;

  const uploadedFiles = [];

  for (let i = 0; i < files.length; i++) {

    uploadedFiles.push({
      name: files[i].name,
      type: files[i].type
    });

  }

  const newWork = {

    title:
      document.getElementById("projectTitle").value,

    description:
      document.getElementById("description").value,

    studentClass:
      document.getElementById("studentClass").value,

    subject:
      document.getElementById("subject").value,

    taggedName:
      document.getElementById("taggedName").value,

    teacherName:
      document.getElementById("teacherName").value,

    files:
      uploadedFiles,

    projectLink:
      document.getElementById("projectLink").value,

    likes: 0,

    approved: false,

    uploadedAt:
      new Date().toLocaleString()

  };

  const pendingWorks =
    JSON.parse(localStorage.getItem("pendingWorks")) || [];

  pendingWorks.push(newWork);

  localStorage.setItem(
    "pendingWorks",
    JSON.stringify(pendingWorks)
  );

  alert(
    "Student work uploaded successfully and is waiting for admin approval."
  );

  uploadForm.reset();

});
