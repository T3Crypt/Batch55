const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 8000;
const projects = [];
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

// Get Icon
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

// app.set
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Middleware to process form input
app.use(express.urlencoded({ extended: false }));


// Bisa juga gini, tapi buat function lagi dibawahnya nanti
//  -> app.get("/", home);

// // Route untuk home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});
// Route contact
app.get('/contact', (req, res) => {
    res.render('contact', { projects });
});

app.get('/testimonial', (req, res) => {
    res.render('testimonial', { projects });
});

app.get('/myproject', (req, res) => {
    res.render('myproject', { projects, getTechnologyIcon });
});

app.get('/add-project', (req, res) => {
    res.render('add-project', { projects, getTechnologyIcon });
});

app.get('/myproject/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        res.render('projectDetail', { project: projects[index], getTechnologyIcon });
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
