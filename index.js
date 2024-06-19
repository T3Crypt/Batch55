const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

const projects = [];
const defaultImage = 'Gambar-1.png'; // Nama file gambar default

// Set view engine to hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'assets/views'));

// Middleware untuk mengatur path statis
app.use("/assets", express.static(path.join(__dirname, 'assets')));

// Middleware untuk memproses inputan dari form
app.use(express.urlencoded({ extended: false }));

// Route untuk home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/contact', (req, res) => {
    res.render('contact', { projects });
});

app.get('/testimonial', (req, res) => {
    res.render('testimonial', { projects });
});
// Route untuk myproject page
app.get('/myproject', (req, res) => {
    res.render('myproject', { projects });
});

// Route untuk add-project page
app.get('/add-project', (req, res) => {
    res.render('add-project');
});

// Route untuk menampilkan detail project berdasarkan index
app.get('/myproject/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        res.render('projectDetail', { project: projects[index] });
    } else {
        res.redirect('/myproject'); // Atau sesuaikan dengan penanganan yang sesuai
    }
});


// Route untuk menerima data form dan menambahkannya ke projects
app.post('/add-project', (req, res) => {
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

    // Simpan informasi proyek dan nama gambar default di projects
    const newProject = {
        inputProjectName,
        startDate,
        endDate,
        inputDescription,
        technologies: Array.isArray(technologies) ? technologies : [technologies],
        image: defaultImage // Gunakan gambar default
    };
    projects.push(newProject);
    res.redirect('/myproject');
});

// Route untuk update project berdasarkan index
app.get('/update-project/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        res.render('update-project', { project: projects[index], index });
    } else {
        res.redirect('/myproject');
    }
});

// Route untuk memproses data form update project
app.post('/update-project/:index', (req, res) => {
    const { index } = req.params;
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

    if (index >= 0 && index < projects.length) {
        projects[index] = {
            inputProjectName,
            startDate,
            endDate,
            inputDescription,
            technologies: Array.isArray(technologies) ? technologies : [technologies],
            image: projects[index].image // Tetap gunakan gambar yang sudah ada
        };
    }
    res.redirect('/myproject');
});

// Route untuk delete project berdasarkan index
app.post('/delete-project/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        projects.splice(index, 1);
    }
    res.redirect('/myproject');
});

// Start the server
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
