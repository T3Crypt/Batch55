const express = require('express');
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 8000;
const defaultImage = '/assets/img/Gambar-1.png';

// Itung tanggal
function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 31) {
        return `${diffDays} Day`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} Month`;
    } else {
        const years = Math.floor(diffDays / 365);
        const remainingMonths = Math.floor((diffDays % 365) / 30);
        return `${years} Year ${remainingMonths} Month`;
    }
}

// Fungsi untuk mendapatkan ikon teknologi
function getTechnologyIcon(technology) {
    switch (technology) {
        case 'Node.js':
            return '<i class="fa-brands fa-js"></i>';
        case 'React.js':
            return '<i class="fab fa-react"></i>';
        case 'Next.js':
            return '<i class="fa-solid fa-n"></i>';
        case 'TypeScript':
            return '<i class="fa-brands fa-codepen"></i>';
        default:
            return '';
    }
}


// fungsi waktu format indo
function formatDateIndo(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// app.set
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Middleware to process form input
app.use(express.urlencoded({ extended: false }));

// Route untuk home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route myproject
app.get('/myproject', async (req, res) => {
    const query = `SELECT * FROM "tb_projects"`;
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT });

    projects.forEach(project => {
        // fungsi tahun awal
        if (project.start_date) {
            project.startYear = new Date(project.start_date).getFullYear();
        } else {
            project.startYear = "N/A";
        }

        //fungsi durasi
        if (project.start_date && project.end_date) {
            project.duration = calculateDuration(project.start_date, project.end_date);
        } else {
            project.duration = "N/A";
        }

        // Tambahkan ikon teknologi ke dalam setiap teknologi
        project.technologies = project.technologies.map(tech => {
            return {
                name: tech,
                icon: getTechnologyIcon(tech)
            };
        });
    });

    res.render('myproject', { projects });
});

// Route contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/testimonial', (req, res) => {
    res.render('testimonial');
});

app.get('/add-project', (req, res) => {
    res.render('add-project', { getTechnologyIcon });
});

// CEK MYPROJECT DETAIL
app.get('/myproject/:id', async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM "tb_projects" WHERE id = :id`;
    const project = await sequelize.query(query, {
        replacements: { id: id },
        type: QueryTypes.SELECT,
        plain: true
    });

    if (project) {
        // fungsi tahun awal
        project.startYear = new Date(project.start_date).getFullYear();
        project.duration = calculateDuration(project.start_date, project.end_date);


        // format tanggal indo
        project.formattedStartDate = formatDateIndo(project.start_date);
        project.formattedEndDate = formatDateIndo(project.end_date);


        // fungsi iconnya
        project.technologies = project.technologies.map(tech => ({
            name: tech,
            icon: getTechnologyIcon(tech)
        }));

        res.render('projectDetail', { project, getTechnologyIcon });
    } else {
        res.redirect('/myproject');
    }
});


app.post('/add-project', (req, res) => {
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

    const newProject = {
        inputProjectName,
        startDate,
        endDate,
        inputDescription,
        technologies: Array.isArray(technologies) ? technologies : [technologies],
        image: defaultImage
    };

    newProject.startYear = new Date(startDate).getFullYear();
    newProject.duration = calculateDuration(startDate, endDate);

    projects.push(newProject);
    console.log('Project Added:', newProject);
    res.redirect('/myproject');
});

app.get('/update-project/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        res.render('update-project', { project: projects[index], index, getTechnologyIcon });
    } else {
        res.redirect('/myproject');
    }
});

app.post('/update-project/:index', (req, res) => {
    const { index } = req.params;
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

    if (index >= 0 && index < projects.length) {
        const updatedProject = {
            inputProjectName,
            startDate,
            endDate,
            inputDescription,
            technologies: Array.isArray(technologies) ? technologies : [technologies],
            image: projects[index].image
        };
        projects[index] = updatedProject;
        updatedProject.startYear = new Date(startDate).getFullYear();
        updatedProject.duration = calculateDuration(startDate, endDate);
        console.log('Project Updated:', updatedProject);
    }
    res.redirect('/myproject');
});

app.post('/delete-project/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        const deletedProject = projects.splice(index, 1)[0];
        console.log('Project Deleted:', deletedProject);
    }
    res.redirect('/myproject');
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
