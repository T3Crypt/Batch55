// Inisialisasi array untuk menyimpan data proyek
let projectsData = [];

function submitProject(event) {
  // Mencegah form dari submit default
  event.preventDefault();

  // Mengambil nilai dari form input
  let projectName = document.getElementById("inputProjectName").value;
  let projectStartDate = document.getElementById("inputStartDate").value;
  let projectEndDate = document.getElementById("inputEndDate").value;
  let projectDescription = document.getElementById("inputDescription").value;
  let projectTechnologies = [];
  let projectImage = document.getElementById("inputImage").files;

  // Cek teknologi yang dipilih dan tambahkan ikon Font Awesome
  if (document.getElementById("techNodeJs").checked) {
    projectTechnologies.push('<i class="fa-brands fa-js"></i> Node.js');
  }
  if (document.getElementById("techReactJs").checked) {
    projectTechnologies.push('<i class="fab fa-react"></i> ReactJs');
  }
  if (document.getElementById("techNextJs").checked) {
    projectTechnologies.push('<i class="fa-solid fa-n"></i> NextJs');
  }
  if (document.getElementById("techTypeScript").checked) {
    projectTechnologies.push('<i class="fa-brands fa-codepen"></i> TypeScript');
  }

  // Validasi input
  if (!projectName || !projectStartDate || !projectEndDate || !projectDescription || projectTechnologies.length === 0 || projectImage.length == 0) {
    alert("Please fill out all the fields and select at least one technology, and upload an image.");
    return;
  }

  // Mengambil URL dari file gambar yang di-upload
  if (projectImage.length > 0) {
    projectImage = URL.createObjectURL(projectImage[0]);
  } else {
    projectImage = 'path-to-default-image.jpg'; // Ganti dengan path ke gambar default jika tidak ada gambar yang di-upload
  }

  // Membuat objek proyek baru
  let newProject = {
    name: projectName,
    startDate: projectStartDate,
    endDate: projectEndDate,
    description: projectDescription,
    technologies: projectTechnologies,
    image: projectImage,
    author: "Teguh Irfan Ardiansyah",
  };

  // Menambahkan proyek baru ke array
  projectsData.push(newProject);
  console.log("dataArray", projectsData);

  
  // Memanggil fungsi untuk menampilkan semua proyek
  renderProjects();
}

function renderProjects() {
  let projectsContainer = document.getElementById("projectsContainer");
  projectsContainer.innerHTML = ""; // Mengosongkan container

  // Loop melalui semua data proyek dan membuat HTML untuk setiap proyek
  projectsData.forEach((project, index) => {
    const startYear = new Date(project.startDate).getFullYear();
    projectsContainer.innerHTML += `
      <div class="project-card">
        <img src="${project.image}" alt="Project Image">
        <h3>${project.name} - ${startYear}</h3>
        <p>${project.description}</p>
        <div class="project-technologies">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join(' ')}
        </div>
        <p>Start Date: ${project.startDate}</p>
        <p>End Date: ${project.endDate}</p>
        <div class="project-actions">
          <button class="button edit">Edit</button>
          <button class="button delete" onclick="deleteProject(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function deleteProject(index) {
  projectsData.splice(index, 1);
  renderProjects();
}

// Pastikan untuk memanggil fungsi ini di akhir file untuk menampilkan proyek saat halaman dimuat
renderProjects();
